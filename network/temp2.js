const {onBusMessage, sendMessage} = require('./networkBus');

onBusMessage('message', msg => console.log('temp2 receive', msg));

setInterval(() => sendMessage('LOG', {msg: 'log from temp2'}), 3000);
