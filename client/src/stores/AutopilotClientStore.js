import {observable} from 'mobx'
import '../services/communicationService'
import {sendMessage} from "../services/communicationService";



export const values = observable.map();

export const sendToAutopilot = data => sendMessage('AUTOPILOT', {data});





