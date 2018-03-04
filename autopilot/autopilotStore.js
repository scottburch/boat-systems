const  {observable, autorun, toJS, runInAction}  = require('mobx');
const {onBusMessage, sendMessage} = require('../network/networkBus');
const _ = require('lodash');


const presets = require('./presets');

const values = module.exports.values = observable.map();


onBusMessage('AHRS', v => runInAction('merge AHRS values', () => values.merge(v)));
onBusMessage('AUTOPILOT', v => values.merge(v));


autorun(() => {
    values.get('preset') || values.set('preset', 'motor-light');
    values.merge(presets[values.get('preset')].values);
});

autorun(() => sendMessage('AUTOPILOT', toJS(values)));
autorun(() => sendMessage('RUDDER', {rudder: values.get('rudder')}));
