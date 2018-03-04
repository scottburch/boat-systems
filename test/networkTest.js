const receiver = require('../network/libs/NetworkReceiver').createNetworkReceiver();
const {sendHeading} = require('../network/compassSender/compassSender');

receiver.on('listening', (...args) => console.log('listening', args));
receiver.on('message', (msg) => console.log('message', msg.toString()));
receiver.on('error', (...args) => console.log('error', args));

setInterval(() => sendHeading(200), 1000);
