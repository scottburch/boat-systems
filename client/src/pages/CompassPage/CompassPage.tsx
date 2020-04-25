import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {offBusMessage, onBusMessage, sendMessage} from "../../services/communicationService";
import {MessageEvents} from "../../../../network/networkBus/src/MessageEvents";
import {CompassCalibrationMessage} from "../../../../network/networkBus/src/messages/CompassCalibrationMessage";
import {JitterCalculator} from "./JitterCalculator";
import {AHRSMessage} from "../../../../network/networkBus/src/messages/AHRSMessage";
// @ts-ignore
import {XYPlot, LineSeries, YAxis} from 'react-vis';
import 'react-vis/dist/style.css';

export const CompassPage = () => {
    const [compassState, setCompassState] = useState<CompassCalibrationMessage>({} as CompassCalibrationMessage)
    const [jitterData] = useState<number[]>([]);
    const [ahrs, setAHRS] = useState({} as any);


    const calibrateCompass = (): void => sendMessage(MessageEvents.CALIBRATE_COMPASS);
    const jitter = new JitterCalculator();


    useEffect(() => {
        onBusMessage(MessageEvents.COMPASS_STATE, setCompassState);
        const i = setInterval(() => sendMessage(MessageEvents.GET_COMPASS_STATE), 2000);
        return () => {
            clearInterval(i);
            offBusMessage(MessageEvents.COMPASS_STATE, setCompassState)
        };
    }, [])

    useEffect(() => {
        onBusMessage(MessageEvents.AHRS, (ahrs: AHRSMessage) => {
            JitterCalculator.checkExpire(jitter);
            JitterCalculator.update(jitter, ahrs.compassTime);
            jitter.jitter && jitterData.push(jitter.jitter);
            jitterData.length > 100 && jitterData.shift();
            setAHRS(ahrs);
        });
        return () => {
            offBusMessage(MessageEvents.AHRS, setAHRS);
        }
    }, []);


    return (
        <>
            <Table style={{width: 0}}>
                <tbody>
                <Value label="Magnetometer Cal">{compassState.magCal}</Value>
                <Value label="Accelerometer Cal">{compassState.accCal}</Value>
                <Value label="Gyro Cal">{compassState.gyroCal}</Value>
                <Value label="Compass Cal">{compassState.cmpCal}</Value>
                <Value label="Heading">{ahrs.heading}</Value>
                </tbody>
            </Table>
            <Button onClick={calibrateCompass}>{compassState.isCal ? 'Calibrating...' : 'Calibrate'}</Button>
            <XYPlot height={300} width={300}>
                <YAxis/>
                <LineSeries data={jitterData.map((n, idx) => ({x: idx, y: n}))} />
            </XYPlot>
        </>
    )
};

const Value = ({label, children}: { label: string, children: string | number }) => (
    <tr>
        <td>
            {label}:
        </td>
        <td>
            {children}
        </td>
    </tr>
)