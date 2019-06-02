const {onBusMessage} = require('electron').remote.require('../network/networkBus');


import {observable} from 'mobx'
const log = observable.array([]);
export const getLogMessages = () => log;


onBusMessage('LOG', msg => console.log('LOG!!!!', msg) || log.push(msg));