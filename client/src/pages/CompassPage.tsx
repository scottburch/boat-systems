import React, {useEffect, useState} from "react";
import {Button, Table} from "react-bootstrap";
import {offBusMessage, onBusMessage, sendMessage} from "../services/communicationService";
import {MessageEvents} from "outside-imports/networkBus/MessageEvents";
import {CompassCalibrationMessage} from 'outside-imports/networkBus/messages/CompassCalibrationMessage'

export const CompassPage = () => {
    const [compassState, setCompassState] = useState<CompassCalibrationMessage>({} as CompassCalibrationMessage)
    const [ahrs, setAHRS] = useState({} as any);

    const calibrateCompass = (): void => sendMessage(MessageEvents.CALIBRATE_COMPASS);


    useEffect(() => {
        onBusMessage(MessageEvents.COMPASS_STATE, setCompassState);
        const i = setInterval(() => sendMessage(MessageEvents.GET_COMPASS_STATE), 2000);
        return () => {
            clearInterval(i);
            offBusMessage(MessageEvents.COMPASS_STATE, setCompassState)
        };
    }, [])

    useEffect(() => {
        onBusMessage(MessageEvents.AHRS, setAHRS);
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