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
chai_1.default.use(sinon_chai_1.default);
describe('network-bus', () => {
    it("should start a ipc connection and send messages", () => {
        const listener = sinon_1.spy();
        network_bus_1.onBusMessage('my-event', listener);
        network_bus_1.sendMessage('my-event', { some: 'data' });
        chai_1.expect(sinon_1.spy).to.have.been.calledWith({ some: 'data' });
    });
});
//# sourceMappingURL=network-bus.spec.js.map