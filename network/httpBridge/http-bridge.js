const express = require('express');
const app = express();
require('express-ws')(app);
const {sendMessage, onBusMessage, sendLogMessage, offBusMessage} = require('../networkBus/network-bus');

app.get('/', function (req, res, next) {
    res.end("hello world");
});

app.ws('/ws', function (ws, req) {
    ws.on('message', msg => {
            msg = JSON.parse(msg);
            COMMANDS[msg.cmd](ws, msg.data);
    });
});

app.listen(3001);

const COMMANDS = {
    register: (ws, {event}) => {

        const listener = obj => {
            try {
                ws.send(JSON.stringify({
                    event: event,
                    data: obj
                }, (k, v) => v === undefined ? null : v));
            } catch (e) {
                sendLogMessage(`HTTP-BRIDGE:ERROR: ${e.toString()}`)
            }
        };

        console.log('registering ', event);
        onBusMessage(event, listener);
        ws.on('close', () => offBusMessage(event, listener));

    },
    send:  (ws, {event, data}) => {
        sendMessage(event, data);
    }
};