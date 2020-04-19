import {observable} from 'mobx'
import {onBusMessage} from "../services/communicationService";


export const log = observable.array([]);

export const getLogMessages = () => log;
export const clearLogMessages = log.clear.bind(log);

setTimeout(() => {
    onBusMessage('LOG', (msg) => log.push(msg));
});