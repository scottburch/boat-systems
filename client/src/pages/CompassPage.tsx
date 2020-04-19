import React, {useEffect, useState} from "react";
import {Table} from "react-bootstrap";
import {offBusMessage, onBusMessage, sendMessage} from "../services/communicationService";
import {MessageEvents} from "../services/MessageEvents";

export const CompassPage = () => {
//    const [calibrating, setCalibrating] = useState()
    const [compassState, setCompassState] = useState({} as any)

    useEffect(() => {
        onBusMessage(MessageEvents.COMPASS_STATE, setCompassState);
        sendMessage(MessageEvents.GET_COMPASS_STATE);
        return () => offBusMessage(MessageEvents.COMPASS_STATE, setCompassState);
    })
    return (
    <>
        <Table style={{width: 0}}>
            <tbody>
            <Value label="Magnetometer Cal">{compassState.magCal}</Value>
            <Value label="Accelerometer Cal">{compassState.accCal}</Value>
            <Value label="Gyro Cal">{compassState.gyroCal}</Value>
            <Value label="Compass Cal">{compassState.cmpCal}</Value>
            </tbody>
        </Table>
    </>
)};

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