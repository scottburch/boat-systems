const _ = require('lodash');
const {objToMsg, msgToObj} = require("../utils");

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
    }
);


module.exports.onBusMessage = (event, listener) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener)
};

module.exports.sendMessage = (event, data) =>
    ipc.of['boat-systems'].emit('message', objToMsg({event: event, data: data}));

module.exports.sendLogMessage = data =>
    module.exports.sendMessage('LOG', data);





