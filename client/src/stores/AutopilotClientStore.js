import {observable} from 'mobx'
//import {onBusMessage, sendMessage} from '../../../network/networkBus';
import '../services/communicationService'
import {sendMessage} from "../services/communicationService";



export const values = observable.map();
global.values = values;

export const sendToAutopilot = data => sendMessage('AUTOPILOT', {data});





