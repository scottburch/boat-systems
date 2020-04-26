import {MessageEvents} from "./MessageEvents";
import {pull, memoize} from 'lodash'
import delay from "delay";

let ws;

if(typeof window !== 'undefined') {
    ws = new window.WebSocket(`ws://${window.location.hostname}:3001/ws`);
    ws.onmessage = (msg) => {
        const {event, data} = JSON.parse(msg.data);
        listeners[event].forEach((listener: Function) => listener(data))
    };
    console.dir(ws);
}


const listeners: any = {}

const wsSend = async (data: {cmd: string, data: any}) => {
    while(ws.readyState !== 1) {
        await delay(100);
    }
    ws.send(JSON.stringify(data));
}


const registerForMessages = memoize((event: string): void => {
    listeners[event] = listeners[event] || [];
    wsSend({cmd: 'register', data: {event}});
});




export const sendMessage = (event: MessageEvents, data = {}) => typeof window !== 'undefined' && wsSend({cmd: 'send', data: {event, ...data}});
export const onBusMessage = (event: MessageEvents, listener: Function) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener);
    registerForMessages(event);
};

export const offBusMessage = (event: string, listener: Function): void => {
    pull(listeners[event], listener)
};

