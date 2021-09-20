"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const node_ipc_1 = __importDefault(require("node-ipc"));
const utils_1 = require("../../utils/lib/utils");
node_ipc_1.default.config.id = 'boat-systems';
node_ipc_1.default.config.retry = 1500;
node_ipc_1.default.config.silent = true;
const listeners = {};
node_ipc_1.default.connectTo('boat-systems', () => {
    node_ipc_1.default.of['boat-systems'].on('message', (msg) => {
        const obj = utils_1.msgToObj(msg);
        (listeners[obj.event] || []).forEach(listener => listener(obj.data));
    });
    console.log('network-bus listening');
});
exports.onBusMessage = (event, listener) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener);
};
exports.offBusMessage = (event, listener) => {
    lodash_1.pull(listeners[event], listener);
};
exports.sendMessage = (event, data) => node_ipc_1.default.of['boat-systems'].emit('message', utils_1.objToMsg({ event: event, data: data }));
exports.sendLogMessage = (data) => exports.sendMessage('LOG', data);
//# sourceMappingURL=network-bus.js.map