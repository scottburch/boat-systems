declare type ChangeSchedulerFn = (name: string, value: unknown) => void;
export declare const changeScheduler: (event: string, delay?: number) => ChangeSchedulerFn;
export declare const observableChangeScheduler: (observable: any, event: string, delay?: number, excludes?: string[]) => void;
export {};
//# sourceMappingURL=changeScheduler.d.ts.map