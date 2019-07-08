import {values} from "../stores/AutopilotClientStore";

const ws = new WebSocket(`ws://${window.location.hostname}:3001/ws`);

const listeners = {};

ws.onmessage = (msg) => {
    const messageObj = JSON.parse(msg.data);
    messageObj.event === 'AUTOPILOT' && values.merge(messageObj.data)
};

ws.onopen = () =>
    ws.send(JSON.stringify({cmd: 'register', data: {event: 'AUTOPILOT'}}));

export const sendMessage = (event, data = {}) => ws.send(JSON.stringify({cmd: 'send', data: {event, ...data}}));
export const onBusMessage = (event, listener) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener);
};
