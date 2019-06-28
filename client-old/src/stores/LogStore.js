const {onBusMessage} = require('electron').remote.require('../network/networkBus');


import {observable} from 'mobx'
const log = observable.array([]);

export const getLogMessages = () => log;
export const clearLogMessages = log.clear.bind(log);

onBusMessage('LOG', msg => log.push(msg));