const  {observable, autorun, toJS, runInAction}  = require('mobx');
const {onBusMessage, sendMessage} = require('../network/networkBus');
const _ = require('lodash');
const {Maybe} = require('simple-monads');
const {observableChangeScheduler} = require('../utils/observableChangeScheduler');

const presets = require('./presets');

const values = module.exports.values = observable.map();


onBusMessage('AHRS', v => {
    runInAction('merge AHRS values', () => values.merge(v))
});

autorun(() => {
    Maybe.of(values.get('compassTime'))
        .map(time => sendMessage('COMPASS_PONG', {time: time}));
});

onBusMessage('AUTOPILOT', v => values.merge(v));


autorun(() => {
    values.get('preset') || values.set('preset', 'motor-light');
    values.merge(presets[values.get('preset')].values);
});


setInterval(() => sendMessage('AUTOPILOT', toJS(values)), 5000);

autorun(() => sendMessage('RUDDER', {rudder: values.get('rudder')}));


observableChangeScheduler(values, 'AUTOPILOT', 50, ['compassTime']);
