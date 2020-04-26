import {AutopilotMessage} from "../../../network/networkBus/src/messages/AutopilotMessage";
import {useEffect, useState} from "react";
import {offBusMessage, onBusMessage} from "./communicationService";
import {MessageEvents} from "../../../network/networkBus/src/MessageEvents";

export const useMessageListener = <T>(event: MessageEvents) => {
    const [values, setValues] = useState({} as T)
    const valuesListener = (messageObj: AutopilotMessage) => {
        setValues({...values, ...messageObj});
    };
    useEffect(() => {
        onBusMessage(event, valuesListener);
        return () => offBusMessage(event, valuesListener);
    })
    return [values, setValues];

}