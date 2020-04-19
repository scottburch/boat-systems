import React from "react";
import {Table} from "react-bootstrap";

export const CompassPage = () => {
//    const [calibrating, setCalibrating] = useState()
    return (
    <>
        <Table style={{width: 0}}>
            <tbody>
            <Value label="Magnetometer Cal">xxx</Value>
            <Value label="Accelerometer Cal">xxx</Value>
            <Value label="Gyro Cal">xxx</Value>
            <Value label="Compass Cal">xxx</Value>
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