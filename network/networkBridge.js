const _ = require('lodash');

const dgram = require('dgram');
const {PORT, IP_ADDRESS, myID} = require('./networkSettings');
const {msgToObj, objToMsg} = require("./utils");

const networkSocket = dgram.createSocket('udp4');
networkSocket.bind(PORT, () =>
    networkSocket.addMembership(IP_ADDRESS)
);

const clients = [];

const ipc = require('node-ipc');


ipc.config.id = 'boat-systems';
ipc.config.retry = 1500;
ipc.config.silent = true;

ipc.serve(
    () => {
        startNetworkListener();

        ipc.server.on('connect', (socket) => clients.push(socket));

        ipc.server.on(
            'message',
            (msg, socket) => {
                const obj = msgToObj(msg);
                    setTimeout(() => sendToNetwork(obj));
                    clients.forEach(s => s !== socket && setTimeout(() => ipc.server.emit(s, 'message', objToMsg({...obj, source: 'ipc'}))));
            }
        );
        ipc.server.on(
            'socket.disconnected',
            function (socket, destroyedSocketID) {
//                ipc.log('client ' + destroyedSocketID + ' has disconnected!');
            }
        );
    }
);

ipc.server.start();


const startNetworkListener = () => {
    networkSocket.on('message', msg => {
        const obj = msgToObj(msg.toString());
        _.includes(obj.hops, myID) || setTimeout(() => sendToIpcClients(obj));

        const sendToIpcClients = (obj) => {
            clients.forEach(s => setTimeout(() => ipc.server.emit(s, 'message', objToMsg({...obj, source: 'udp'}))));
        };
    });
};






const sendToNetwork = (obj) => {
    obj.hops = (obj.hops || []).concat([myID]);
    networkSocket.send(
        objToMsg(obj),
        PORT,
        IP_ADDRESS, (err, result) => err ? console.log(err) : () => {}
    )
};


