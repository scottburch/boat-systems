const _ = require('lodash');
const {nullToUndefined} = require('../autopilot/utils');

const ipc = require('node-ipc');

ipc.config.id = 'boat-systems';
ipc.config.retry = 1500;
ipc.config.silent = true;


const objToMsg = obj => `$${JSON.stringify(obj, (k, v) => v === undefined ? null : v)}\n`;
const msgToObj = msg => nullToUndefined(JSON.parse(msg.toString().replace(/^\$/, '')));


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






//setTimeout(() => module.exports.send('LOG', {msg: 'here is the log message'}), 5000);

//setTimeout(() => module.exports.send('MY_EVENT', {foo: 1}), 5000);
//setTimeout(() => networkSocket.send(JSON.stringify({event: 'MY_EVENT', foo: 2}), PORT,  IP_ADDRESS), 5000);

