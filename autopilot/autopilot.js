const {autorun, reaction} = require('mobx');

"use strict";
const PID = require('node-pid-controller');

const {values} = require('./autopilotStore');
const utils = require('./utils');
let pidController;


values.merge({
    heading: 180,
    rudder: 0
});


autorun(() => {
    if (values.get('course') === undefined) {
        pidController = undefined;
        values.set('rudder', 0);
//        values.set('error', 0);
    }
});

const stateIdle = {
    name: 'IDLE',
    execute() {
        if (values.get('course')) {
            calcCourseError();
            changeState(stateTurning);
        } else {
            setTimeout(stateIdle.execute, 50);
        }
    }
};

const stateTurning = {
    name: 'TURNING',
    execute() {
        setTimeout(() => changeState(stateWaiting), values.get('rudderTime'));
    }
};

const stateWaiting = {
    name: 'WAITING',
    execute() {
        values.set('rudder', 0);
        setTimeout(() => changeState(stateIdle), values.get('rudderWait'));
    }
};

setTimeout(() => changeState(stateIdle), 0);

function changeState(state) {
    values.set('rudderState', state.name);
    state.execute();
}

function calcCourseError() {
    const error = values.get('course') === undefined ? undefined : utils.fixed(utils.getDirectionalDiff(values.get('course'), values.get('heading')));
    values.set('error', error);
}

autorun(() => {
    createPIDController();
    pidController.k_p = values.get('kP');
    pidController.k_i = values.get('kI');
    pidController.k_d = values.get('kD');
});


function createPIDController() {
    pidController = new PID({
        k_p: values.get('kP'),
        k_i: values.get('kI'),
        k_d: values.get('kD')
    });
    pidController.setTarget(0);
}


const calcRudder = (function () {
    let last = 0;
    return (error) => {
        values.get('course') === undefined ? noRudder() : handleError();

        function handleError() {
            pidController || createPIDController();
            let result = pidController.update(error);
            let newRudder = utils.fixed((result - last) * values.get('rudderMult'), 0);
            values.set('rudder', newRudder < 0 ? Math.max(-1023, newRudder) : Math.min(1023, newRudder));
            last = result;
        }

        function noRudder() {
            last = 0;
            values.set('rudder', 0);
        }
    }
}());

reaction(() => values.get('error'), error => error && calcRudder(error));

