const dgram = require('dgram');

class NetworkReceiver {
    constructor() {
        this.socket = dgram.createSocket('udp4');
        this.address = '224.0.0.0';
        this.port = 5000;
        this.socket.bind(5000, () =>
            this.socket.addMembership(this.address)
        );
    }

    on(event, cb)  {
        this.socket.on(event, cb)
    }
}


module.exports.createNetworkReceiver = (...args) => new NetworkReceiver(...args);

