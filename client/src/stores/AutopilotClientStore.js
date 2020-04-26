//import {observable} from 'mobx'
import {sendMessage} from "../services/communicationService";


export const sendToAutopilot = data => sendMessage('AUTOPILOT', {data});





