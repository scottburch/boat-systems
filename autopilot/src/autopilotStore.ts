import {RudderMessage} from "network-bus/src/messages/RudderMessage";

import {observable, autorun, reaction, toJS, runInAction} from 'mobx';

import {onBusMessage, sendMessage} from 'network-bus/src/network-bus';
const _ = require('lodash');
const {Maybe} = require('simple-monads');
const {observableChangeScheduler} = require('common/changeScheduler');

const presets = require('./presets');

type AutopilotProperties = 'rudder' | 'preset' | 'compassTime' | 'error' | 'rudderWait' | 'rudderTime' | 'course' | 'kP' | 'kI' | 'kD' | 'rudderState' | 'heading'
export const values = observable.map<AutopilotProperties, any>();


onBusMessage('AHRS', v => {
    runInAction('merge AHRS values', () => values.merge(v))
});

onBusMessage('AUTOPILOT', v => values.merge(v));


autorun(() => runInAction('Presets updates', () => {
    values.get('preset') || values.set('preset', 'motor-light');
    values.merge(presets[values.get('preset')].values);
}));


setInterval(() => sendMessage('AUTOPILOT', toJS(values)), 5000);

reaction(
    () => ({rudder: values.get('rudder')}),
    ({rudder}) => sendMessage<RudderMessage>('RUDDER', {rudder, time: Date.now(), compassTime: values.get('compassTime') || 0})
);

observableChangeScheduler(values, 'AUTOPILOT', 10, ['compassTime']);
