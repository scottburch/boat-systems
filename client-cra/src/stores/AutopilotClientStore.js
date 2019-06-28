import {observable} from 'mobx'
//import {onBusMessage, sendMessage} from '../../../network/networkBus';

const onBusMessage = () => {};
const sendMessage = () => {};

export const values = observable.map();
global.values = values;

onBusMessage('AUTOPILOT', obj => values.merge(obj));
onBusMessage('COMPASS_DELAY', obj => values.merge({compassDelay: obj.delay}));


export const sendToAutopilot = obj => sendMessage('AUTOPILOT', obj);





