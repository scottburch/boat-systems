import {MessageEvents} from "../../../network/networkBus/src/MessageEvents";
import {pull, memoize} from 'lodash'

const ws = new WebSocket(`ws://${window.location.hostname}:3001/ws`);

const listeners: any = {}

ws.onmessage = (msg) => {
    const {event, data} = JSON.parse(msg.data);
    listeners[event].forEach((listener: Function) => listener(data))
};

ws.onopen = () => {
    registerForMessages(MessageEvents.AUTOPILOT);
    registerForMessages(MessageEvents.LOG);
    registerForMessages(MessageEvents.COMPASS_STATE);
    registerForMessages(MessageEvents.AHRS);
}

const registerForMessages = memoize((event: string): void => {
    listeners[event] = listeners[event] || [];
    ws.send(JSON.stringify({cmd: 'register', data: {event}}));
});




export const sendMessage = (event: string, data = {}) => ws.send(JSON.stringify({cmd: 'send', data: {event, ...data}}));
export const onBusMessage = (event: string, listener: Function) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener);
};

export const offBusMessage = (event: string, listener: Function): void => {
    pull(listeners[event], listener)
};

