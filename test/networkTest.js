const receiver = require('../network/libs/NetworkReceiver').createNetworkReceiver();

receiver.on('listening', (...args) => console.log('listening', args));
receiver.on('message', (msg) => console.log('message', msg));
receiver.on('error', (...args) => console.log('error', args));

