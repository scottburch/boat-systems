const express = require('express');
const app = express();
require('express-ws')(app);
const {sendMessage, onBusMessage} = require('../networkBus/network-bus');

app.get('/', function(req, res, next){
    res.end("hello world");
});

app.ws('/ws', function(ws, req) {
    ws.on('message', msg => {
        msg = JSON.parse(msg);
        console.log('message', msg);
        COMMANDS[msg.cmd](ws, msg);
    });
});

app.listen(3001);

const COMMANDS = {
    register: (ws, {event}) => {
        console.log('registering ', event)
        onBusMessage(event, obj => ws.send(JSON.stringify({
            event: event,
            data: obj
        })))
    }
};