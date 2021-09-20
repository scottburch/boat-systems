import {isPlainObject, reduce} from "lodash";
import {RudderMessage} from "network-bus/src/messages/RudderMessage";

const nullToUndefined =  (obj: any) => reduce(obj, (result, v, k) => {
    isPlainObject(v) ? (
        result[k] = nullToUndefined(v)
    ) : (
        result[k] = v === null ? undefined : v
    ) ;
    return result;
}, {} as any);

export const objToMsg = (obj: unknown) => `$${JSON.stringify(obj, (k, v) => v === undefined ? null : v)}\n`;

export interface MessageObj {
    event: string
    data: RudderMessage
}

export const msgToObj = (msg: any): MessageObj => nullToUndefined(JSON.parse(msg.toString().replace(/^\$/, '')));

