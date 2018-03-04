const sender = require('../libs/NetworkSender').createNetworkSender();

module.exports.sendHeading = (heading) => {
    sender.send('heading', {heading: heading})
};