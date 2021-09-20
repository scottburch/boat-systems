import { RudderMessage } from "network-bus/src/messages/RudderMessage";
export declare const objToMsg: (obj: unknown) => string;
export interface MessageObj {
    event: string;
    data: RudderMessage;
}
export declare const msgToObj: (msg: any) => MessageObj;
//# sourceMappingURL=utils.d.ts.map