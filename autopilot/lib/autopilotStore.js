"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mobx_1 = require("mobx");
const network_bus_1 = require("network-bus/src/network-bus");
const _ = require('lodash');
const { Maybe } = require('simple-monads');
const { observableChangeScheduler } = require('common/changeScheduler');
const presets = require('./presets');
exports.values = mobx_1.observable.map();
network_bus_1.onBusMessage('AHRS', v => {
    mobx_1.runInAction('merge AHRS values', () => exports.values.merge(v));
});
network_bus_1.onBusMessage('AUTOPILOT', v => exports.values.merge(v));
mobx_1.autorun(() => mobx_1.runInAction('Presets updates', () => {
    exports.values.get('preset') || exports.values.set('preset', 'motor-light');
    exports.values.merge(presets[exports.values.get('preset')].values);
}));
setInterval(() => network_bus_1.sendMessage('AUTOPILOT', mobx_1.toJS(exports.values)), 5000);
mobx_1.reaction(() => ({ rudder: exports.values.get('rudder') }), ({ rudder }) => network_bus_1.sendMessage('RUDDER', { rudder, time: Date.now(), compassTime: exports.values.get('compassTime') || 0 }));
observableChangeScheduler(exports.values, 'AUTOPILOT', 10, ['compassTime']);
//# sourceMappingURL=autopilotStore.js.map