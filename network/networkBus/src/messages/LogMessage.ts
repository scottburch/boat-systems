export enum LogMessageLevel {
    INFO = 'INFO',
    ERROR = 'ERROR'
}

export interface LogMessage {
    level: LogMessageLevel,
    msg: string,
    time: string
}