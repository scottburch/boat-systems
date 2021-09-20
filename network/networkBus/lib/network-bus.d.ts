declare type Listener = (msg: any) => void;
export declare const onBusMessage: (event: string, listener: Listener) => void;
export declare const offBusMessage: (event: string, listener: Listener) => void;
export declare const sendMessage: <T>(event: string, data: T) => any;
export declare const sendLogMessage: (data: unknown) => any;
export {};
//# sourceMappingURL=network-bus.d.ts.map