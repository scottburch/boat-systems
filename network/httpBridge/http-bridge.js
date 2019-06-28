const express = require('express');
const app = express();
require('express-ws')(app);
const {sendMessage, onBusMessage, sendLogMessage} = require('../networkBus/network-bus');

app.get('/', function (req, res, next) {
    res.end("hello world");
});

app.ws('/ws', function (ws, req) {
    let connOpen = true;

    ws.on('message', msg => {
        if (connOpen) {
            msg = JSON.parse(msg);
            COMMANDS[msg.cmd](ws, msg.data);
        } else {
            sendLogMessage('HTTP-BRIDGE: cannot send message to closed client');
        }
    });

    ws.on('close', () => connOpen = false);
});

app.listen(3001);

const COMMANDS = {
    register: (ws, {event}) => {
        console.log('registering ', event);
        onBusMessage(event, obj => {
                try {
                    ws.send(JSON.stringify({
                        event: event,
                        data: obj
                    }, (k, v) => v === undefined ? null : v));
                } catch (e) {
                    sendLogMessage(`HTTP-BRIDGE:ERROR: ${e.toString()}`)
                }
            }
        );

    },
    send:  (ws, {event, data}) => {
        sendMessage(event, data);
    }
};