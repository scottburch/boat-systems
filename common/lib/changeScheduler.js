"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.observableChangeScheduler = exports.changeScheduler = void 0;
const network_bus_1 = require("network-bus/src/network-bus");
const lodash_1 = require("lodash");
const changeScheduler = (event, delay = 10) => {
    let values = {};
    const scheduleSendValues = (0, lodash_1.debounce)(() => {
        (0, network_bus_1.sendMessage)(event, values);
        values = {};
    }, delay);
    return (name, value) => {
        value === undefined ? value = null : value;
        values[name] = value;
        scheduleSendValues();
    };
};
exports.changeScheduler = changeScheduler;
const observableChangeScheduler = (observable, event, delay = 50, excludes = []) => {
    const cs = (0, exports.changeScheduler)(event, delay);
    observable.observe((change) => excludes.includes(change.name) || cs(change.name, change.newValue === undefined ? null : change.newValue));
};
exports.observableChangeScheduler = observableChangeScheduler;
//# sourceMappingURL=changeScheduler.js.map