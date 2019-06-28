import {observable} from 'mobx'
//import {onBusMessage, sendMessage} from '../../../network/networkBus';
import '../services/communicationService'
import {sendMessage, onBusMessage} from "../services/communicationService";



export const values = observable.map();
global.values = values;

onBusMessage('AUTOPILOT', obj => values.merge(obj));
onBusMessage('COMPASS_DELAY', obj => values.merge({compassDelay: obj.delay}));

export const sendToAutopilot = data => sendMessage('AUTOPILOT', {data});





