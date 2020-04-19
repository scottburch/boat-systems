import {MessageEvents} from "./MessageEvents";
import {pull} from 'lodash'

const ws = new WebSocket(`ws://${window.location.hostname}:3001/ws`);

const listeners = {};

ws.onmessage = (msg) => {
    const messageObj = JSON.parse(msg.data);
    listeners[messageObj.event].forEach((listener) => listener(messageObj.data))
};

ws.onopen = () => {
    ws.send(JSON.stringify({cmd: 'register', data: {event: 'AUTOPILOT'}}));
    ws.send(JSON.stringify({cmd: 'register', data: {event: 'LOG'}}))
    ws.send(JSON.stringify({cmd: 'register', data: {event: MessageEvents.COMPASS_STATE}}))
}


export const sendMessage = (event, data = {}) => ws.send(JSON.stringify({cmd: 'send', data: {event, ...data}}));
export const onBusMessage = (event, listener) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener);
};

export const offBusMessage = (event, listener) => pull(listeners[event], listener)

