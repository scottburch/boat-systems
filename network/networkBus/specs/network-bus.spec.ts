import {onBusMessage, sendMessage} from "../lib/network-bus";
import sinonChai from 'sinon-chai';
import chai, {expect} from "chai";
import {fake} from "sinon";
import {passThroughAwait} from "promise-passthrough";
import delay from 'delay'

chai.use(sinonChai);

describe('network-bus', () => {
    it("should start a ipc connection and send messages", () => {
        return Promise.resolve(fake())
            .then(passThroughAwait(listener => onBusMessage('my-event', listener)))
            .then(passThroughAwait(() => sendMessage('my-event', {some: 'data'})))
            .then(passThroughAwait(() => delay(5000)))
            .then(listener => expect(listener).to.have.been.calledWith({some: 'data'}));
    })
})