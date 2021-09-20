"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const network_bus_1 = require("../lib/network-bus");
const sinon_chai_1 = __importDefault(require("sinon-chai"));
const chai_1 = __importStar(require("chai"));
const sinon_1 = require("sinon");
const promise_passthrough_1 = require("promise-passthrough");
const delay_1 = __importDefault(require("delay"));
chai_1.default.use(sinon_chai_1.default);
describe('network-bus', () => {
    it("should start a ipc connection and send messages", () => {
        return Promise.resolve(sinon_1.fake())
            .then(promise_passthrough_1.passThroughAwait(listener => network_bus_1.onBusMessage('my-event', listener)))
            .then(promise_passthrough_1.passThroughAwait(() => network_bus_1.sendMessage('my-event', { some: 'data' })))
            .then(promise_passthrough_1.passThroughAwait(() => delay_1.default(5000)))
            .then(listener => chai_1.expect(listener).to.have.been.calledWith({ some: 'data' }));
    });
});
//# sourceMappingURL=network-bus.spec.js.map