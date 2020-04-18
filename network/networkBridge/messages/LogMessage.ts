export interface DgramMessage {
    event: string
    data: DgramLogMessage,
    hops: number[]
}

export interface DgramLogMessage {
    level: string,
    time: string,
    msg:string
}