import {pull} from 'lodash';

import ipc from 'node-ipc';
import {msgToObj, objToMsg} from "../../utils/lib/utils";
import {Some} from "monet";

ipc.config.id = 'boat-systems';
ipc.config.retry = 1500;
ipc.config.silent = true;


type Listener = (msg: any) => void
const listeners: Record<string, Listener[]> = {};



ipc.connectTo(
    'boat-systems',
    () => {
        ipc.of['boat-systems'].on(
            'message',
            (msg: string) => {
                const obj = msgToObj(msg);
                (listeners[obj.event] || []).forEach(listener => listener(obj.data));
            }
        );
        console.log('network-bus listening')
    }
);


export const onBusMessage = (event: string, listener: Listener) => {
    listeners[event] = listeners[event] || [];
    listeners[event].push(listener)
};

export const offBusMessage = (event: string, listener: Listener) => {
    pull(listeners[event], listener);
};


export const sendMessage = <T>(event: string, data: T) =>
    Some({event: event, data: data})
        .map(objToMsg)
        .forEach(msg =>
            ipc.of['boat-systems'].emit('message', msg)
        )

export const sendLogMessage = (data: unknown) => sendMessage('LOG', data);



