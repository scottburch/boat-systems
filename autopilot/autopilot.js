const {autorun, reaction} = require('mobx');
const {isNil} = require('lodash');

"use strict";
const PID = require('node-pid-controller');

const {values} = require('./autopilotStore');
const utils = require('./utils');
let pidController;


values.merge({
    heading: 0,
    rudder: 0
});


autorun(() => {
    if (isNil(values.get('course'))) {
        pidController = undefined;
        values.set('rudder', 0);
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
    const error = values.get('course') === undefined ? undefined : toFixed(utils.getDirectionalDiff(values.get('course'), values.get('heading')));
    values.set('error', error);
}

const toFixed =  (n, places) => parseFloat(parseFloat(n, 10).toFixed(places));


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
            console.log(result);
            let newRudder = Math.trunc(result - last);
            values.set('rudder', newRudder < 0 ? Math.max(-1023, newRudder) : Math.min(1023, newRudder));
            last = result;
        }

        function noRudder() {
            last = 0;
            values.set('rudder', 0);
        }
    }
}());

//let lastCalcRudder = Date.now();
reaction(() => values.get('error'), error => {
    error && calcRudder(error);
//    lastCalcRudder = Date.now();
});

// This is here to handle a situation where there is error, but it is not changing due to the heading not changing so the rudder does not get updated
// (function loop(){
//     const waitTime = values.get('rudderTime') + values.get('rudderWait') + 200;
//     Date.now() - lastCalcRudder > waitTime && calcRudder(values.get('error'));
//     setTimeout(loop, waitTime);
// }());


