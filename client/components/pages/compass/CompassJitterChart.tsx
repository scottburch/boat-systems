import {useMessageListener} from "../../custom-hooks/useBusListener";
import {AHRSMessage} from "../../../../network/networkBus/src/messages/AHRSMessage";
import {MessageEvents} from "../../../services/MessageEvents";
import React, {useRef, useState} from "react";
import {XYPlot, YAxis, LineSeries} from 'react-vis'

export const CompassJitterChart: React.FC = () => {
    const [values] = useMessageListener<AHRSMessage>(MessageEvents.AHRS);
    const lastTime = useRef(0)
    const queue = useRef(new RotatingQueue(100));


    lastTime.current > 0 && lastTime.current !== values.compassTime && queue.current.push(values.compassTime - lastTime.current);
    lastTime.current = values.compassTime;

    const getJitterData = () => queue.current.map((v, idx) => ({x: idx, y: v}));


    return (
        <XYPlot height={300} width={300}>
            <YAxis/>
            <LineSeries data={getJitterData()} />
        </XYPlot>
    )
}

class RotatingQueue<T> extends Array {
    maxLength: number

    constructor(maxLength: number = 10) {
        super();
        this.maxLength = maxLength;
    }

    push(v: T): number {
        this.length === this.maxLength && this.shift();
        return super.push(v);
    }
}