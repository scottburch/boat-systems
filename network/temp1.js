const {onBusMessage, sendMessage} = require('./networkBus');

//onBusMessage('LOG', msg => console.log('temp1 receive', msg));

setInterval(() => sendMessage('LOG', {msg: 'log from temp1'}), 3000);
