const {onBusMessage} = require('../networkBus');
const dgram = require('dgram');
const {NEMA_PORT, IP_ADDRESS, myID} = require('../networkSettings');
const {Maybe} = require('simple-monads');


const networkSocket = dgram.createSocket('udp4');




onBusMessage('NEMA', msg =>
    Maybe.of(msg)
        .map(msg => msg.sentence.replace('\r', ''))
        .map(msg => `${msg}\r\n`)
        .map(msg => networkSocket.send(msg, NEMA_PORT, IP_ADDRESS))
);
