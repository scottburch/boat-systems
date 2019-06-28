const {observable, autorun, reaction, toJS, runInAction} = require('mobx');
const {onBusMessage, sendMessage} = require('../network/networkBus/network-bus');
const _ = require('lodash');
const {Maybe} = require('simple-monads');
const {observableChangeScheduler} = require('../utils/changeScheduler');

const presets = require('./presets');

const values = module.exports.values = observable.map();


onBusMessage('AHRS', v =>
    runInAction('merge AHRS values', () => values.merge(v))
);

onBusMessage('AUTOPILOT', v => values.merge(v));


autorun(() => runInAction('Presets updates', () => {
    values.get('preset') || values.set('preset', 'motor-light');
    values.merge(presets[values.get('preset')].values);
}));


setInterval(() => sendMessage('AUTOPILOT', toJS(values)), 5000);

reaction(
    () => ({rudder: values.get('rudder')}),
    obj => sendMessage('RUDDER', {...obj, time: values.get('compassTime') || 0})
);

observableChangeScheduler(values, 'AUTOPILOT', 10, ['compassTime']);
