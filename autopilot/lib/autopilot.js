"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("./utils");
const { autorun, reaction } = require('mobx');
const { isNil } = require('lodash');
"use strict";
const PID = require('node-pid-controller');
const autopilotStore_1 = require("./autopilotStore");
let pidController;
autopilotStore_1.values.merge({
    heading: 0,
    rudder: 0
});
autorun(() => {
    if (isNil(autopilotStore_1.values.get('course'))) {
        pidController = undefined;
        autopilotStore_1.values.set('rudder', 0);
    }
});
const stateIdle = {
    name: 'IDLE',
    execute() {
        if (autopilotStore_1.values.get('course')) {
            calcCourseError();
            changeState(stateTurning);
        }
        else {
            setTimeout(stateIdle.execute, 50);
        }
    }
};
const stateTurning = {
    name: 'TURNING',
    execute() {
        setTimeout(() => changeState(stateWaiting), autopilotStore_1.values.get('rudderTime'));
    }
};
const stateWaiting = {
    name: 'WAITING',
    execute() {
        autopilotStore_1.values.set('rudder', 0);
        setTimeout(() => changeState(stateIdle), autopilotStore_1.values.get('rudderWait'));
    }
};
setTimeout(() => changeState(stateIdle), 0);
function changeState(state) {
    autopilotStore_1.values.set('rudderState', state.name);
    state.execute();
}
function calcCourseError() {
    const error = autopilotStore_1.values.get('course') === undefined ? undefined : toFixed(utils_1.getDirectionalDiff(autopilotStore_1.values.get('course'), autopilotStore_1.values.get('heading')).toString(), 1);
    autopilotStore_1.values.set('error', error);
}
const toFixed = (n, places) => parseFloat(parseFloat(n).toFixed(places));
autorun(() => {
    createPIDController();
    pidController.k_p = autopilotStore_1.values.get('kP');
    pidController.k_i = autopilotStore_1.values.get('kI');
    pidController.k_d = autopilotStore_1.values.get('kD');
});
function createPIDController() {
    pidController = new PID({
        k_p: autopilotStore_1.values.get('kP'),
        k_i: autopilotStore_1.values.get('kI'),
        k_d: autopilotStore_1.values.get('kD')
    });
    pidController.setTarget(0);
}
const calcRudder = (function () {
    let last = 0;
    return (error) => {
        autopilotStore_1.values.get('course') === undefined ? noRudder() : handleError();
        function handleError() {
            pidController || createPIDController();
            let result = pidController.update(error);
            let newRudder = Math.trunc(result - last);
            autopilotStore_1.values.set('rudder', newRudder < 0 ? Math.max(-1023, newRudder) : Math.min(1023, newRudder));
            last = result;
        }
        function noRudder() {
            last = 0;
            autopilotStore_1.values.set('rudder', 0);
        }
    };
}());
//let lastCalcRudder = Date.now();
reaction(() => autopilotStore_1.values.get('error'), (error) => {
    error && calcRudder(error);
    //    lastCalcRudder = Date.now();
});
// This is here to handle a situation where there is error, but it is not changing due to the heading not changing so the rudder does not get updated
// (function loop(){
//     const waitTime = values.get('rudderTime') + values.get('rudderWait') + 200;
//     Date.now() - lastCalcRudder > waitTime && calcRudder(values.get('error'));
//     setTimeout(loop, waitTime);
// }());
//# sourceMappingURL=autopilot.js.map