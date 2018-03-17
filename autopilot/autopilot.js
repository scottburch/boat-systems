const {autorun, reaction} = require('mobx');

"use strict";
const PID = require('node-pid-controller');

const {values} = require('./autopilotStore');
const utils = require('./utils');
let pidController;
let kalmanFilter;

const KalmanFilter = require('kalmanjs').default;

values.merge({
    heading: 180,
    rudder: 0
});


autorun(() => {
    if (values.get('course') === undefined) {
        pidController = undefined;
        values.set('rudder', 0);
        values.set('error', 0);
    }
    // I don't think this is neccessary TODO: remove if true
//    values.set('error', 0);
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
    kalmanFilter = kalmanFilter || initKalmanFilter();
    const error = values.get('course') === undefined ? undefined : utils.fixed(utils.getDirectionalDiff(values.get('course'), values.get('heading')));
    values.set('rawError', error);
    values.set('error', kalmanFilter.filter(error));
}

autorun(() => {
    const pid = pidController;
    if(pid) {
        pid.k_p = values.get('kP');
        pid.k_i = values.get('kI');
        pid.k_d = values.get('kD');
    }
});

autorun(() => {
    values.get('kfR');
    values.get('kfQ');
    initKalmanFilter();
});

function initKalmanFilter() {
    return kalmanFilter = new KalmanFilter({R: values.get('kfR'), Q: values.get('kfQ')});
}


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

