const dgram = require('dgram');

class NetworkSender {
    constructor() {
        this.socket = dgram.createSocket('udp4');
        this.address = '224.0.0.0';
        this.port = 5000;
    }

    send(event, data) {
        return new Promise((resolve, reject) =>
            this.socket.send(
                createPacket({event, data}),
                this.port,
                this.address, (err, result) => err ? reject(err) : resolve(result)
            )
        )
    }
}


module.exports.createNetworkSender = (...args) => new NetworkSender(...args);

const createPacket = obj => `$${JSON.stringify(obj)}\n`;