const {sendMessage} = require('./networkBus/src/network-bus');

module.exports.sendError = (error) => {
    console.log(`ERROR: ${error}`);
    sendMessage('LOG', {level: 'ERROR', time: new Date().toString(), msg: error})
};

module.exports.sendInfo = (info) => {
    console.log(`INFO: ${info}`);
    sendMessage('LOG', {level: 'INFO', time: new Date().toString(), msg: info})
};

