import {onBusMessage, sendMessage} from "../../../services/communicationService";
import {MessageEvents} from "../../../services/MessageEvents";
import {useEffect, useState} from "react";
import {Button} from "react-bootstrap";
import {AHRSMessage} from "../../../../network/networkBus/src/messages/AHRSMessage";
import {CompassCalibrationMessage} from "../../../../network/networkBus/src/messages/CompassCalibrationMessage";

export const CompassCalibrationButton = () => {
    const [isCalibrating, setCalibrating] = useState<boolean>(false);
    const [isCalibrated, setCalibrated] = useState<boolean>(false);

    const calibrateCompass = (): void => {
        sendMessage(MessageEvents.CALIBRATE_COMPASS);
    };

    useEffect(() => {
        onBusMessage<CompassCalibrationMessage>(MessageEvents.COMPASS_STATE, ({isCal, cmpCal}: CompassCalibrationMessage) => {
            setCalibrated(cmpCal === 3);
            setCalibrating(isCal);
        });
    }, [])

    const getButtonText = () => {
        if(isCalibrated) {
            return 'Calibrated'
        }
        return isCalibrating ? 'Calibrating...' : 'Calibrate'
    }

    return (
        <Button onClick={calibrateCompass}>{getButtonText()}</Button>
    )
};

