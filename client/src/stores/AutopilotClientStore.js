import {observable} from 'mobx'
import {sendMessage, onBusMessage} from "../services/communicationService";

onBusMessage('AUTOPILOT', messageObj => {
    values.merge(messageObj);
})


export const values = observable.map();

export const sendToAutopilot = data => sendMessage('AUTOPILOT', {data});





