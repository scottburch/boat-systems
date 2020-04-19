import {pull} from 'lodash';

const {objToMsg, msgToObj} = require("../utils");
const IPC = require('node-ipc/services/IPC');
const ipc = require('node-ipc');

ipc.config.id = 'boat-systems';
ipc.config.retry = 1500;
ipc.config.silent = true;


const listeners = {};

ipc.connectTo(
    'boat-systems',
    () => {
        ipc.of['boat-systems'].on(
            'message',
            (msg) => {
                const obj = msgToObj(msg);
                (listeners[obj.event] || []).forEach(listener => listener(obj.data));
            }
        );
        console.log('network-bus listening')
    }
);


export const onBusMessage = (event, listener) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener)
};

export const offBusMessage = (event, listener) => {
    pull(listeners[event], listener);
};

export const sendMessage = (event, data) =>
    ipc.of['boat-systems'].emit('message', objToMsg({event: event, data: data}));

export const sendLogMessage = data => sendMessage('LOG', data);



