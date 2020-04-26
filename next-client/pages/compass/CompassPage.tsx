import {useMessageListener} from "../../components/custom-hooks/useBusListener";
import {CompassCalibrationMessage} from "../../../network/networkBus/src/messages/CompassCalibrationMessage";
import {MessageEvents} from "../../services/MessageEvents";
import {useEffect} from "react";
import {sendMessage} from "../../services/communicationService";
import {AHRSMessage} from "../../../network/networkBus/src/messages/AHRSMessage";

export const CompassPage = () => {
    const [compassState] = useMessageListener<CompassCalibrationMessage>(MessageEvents.COMPASS_STATE);
    const [ahrs] = useMessageListener<AHRSMessage>(MessageEvents.AHRS);

    useEffect(() => {
        const i = setInterval(() => sendMessage(MessageEvents.GET_COMPASS_STATE), 2000);
        return () => clearInterval(i);
    })

    return (
        <>
            <Value label="Magnetometer Cal">{compassState.magCal}</Value>
            <Value label="Accelerometer Cal">{compassState.accCal}</Value>
            <Value label="Gyro Cal">{compassState.gyroCal}</Value>
            <Value label="Compass Cal">{compassState.cmpCal}</Value>
            <Value label="Heading">{ahrs.heading}</Value>
            </>
    )
}

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