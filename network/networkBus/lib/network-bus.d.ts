declare type Listener = (msg: any) => void;
export declare const onBusMessage: (event: string, listener: Listener) => void;
export declare const offBusMessage: (event: string, listener: Listener) => void;
export declare const sendMessage: <T>(event: string, data: T) => void;
export declare const sendLogMessage: (data: unknown) => void;
export {};
//# sourceMappingURL=network-bus.d.ts.map