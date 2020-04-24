"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const { objToMsg, msgToObj } = require("../../utils");
const IPC = require('node-ipc/services/IPC');
const ipc = require('node-ipc');
ipc.config.id = 'boat-systems';
ipc.config.retry = 1500;
ipc.config.silent = true;
const listeners = {};
ipc.connectTo('boat-systems', () => {
    ipc.of['boat-systems'].on('message', (msg) => {
        const obj = msgToObj(msg);
        (listeners[obj.event] || []).forEach(listener => listener(obj.data));
    });
    console.log('network-bus listening');
});
exports.onBusMessage = (event, listener) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener);
};
exports.offBusMessage = (event, listener) => {
    lodash_1.pull(listeners[event], listener);
};
exports.sendMessage = (event, data) => ipc.of['boat-systems'].emit('message', objToMsg({ event: event, data: data }));
exports.sendLogMessage = data => exports.sendMessage('LOG', data);
