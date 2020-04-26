import {AutopilotMessage} from "../../../network/networkBus/src/messages/AutopilotMessage";
import {useEffect, useState} from "react";
import {offBusMessage, onBusMessage} from "../../services/communicationService";
import {MessageEvents} from "../../services/MessageEvents";

export const useMessageListener = <T>(event: MessageEvents): [T, any] => {
    const [values, setValues] = useState({} as T)
    const valuesListener = (messageObj: T) => {
        setValues({...values, ...messageObj});
    };
    useEffect(() => {
        onBusMessage(event, valuesListener);
        return () => offBusMessage(event, valuesListener);
    })
    return [values, setValues];

}