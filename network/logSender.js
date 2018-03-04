const {sendMessage} = require('./networkBus');

module.exports.sendError = (error) => {
    sendMessage('LOG', {level: 'ERROR', time: new Date().toString(), msg: error})
};

module.exports.sendInfo = (info) => {
    sendMessage('LOG', {level: 'INFO', time: new Date().toString(), msg: info})
};

