import React, {useEffect, useState} from 'react'
import {observer} from 'mobx-react'
import {ValueField} from "./ValueField";
import {Color} from "./Color";
import {offBusMessage, onBusMessage} from "../../services/communicationService";
import {MessageEvents} from "../../../../network/networkBus/src/MessageEvents";
import {AutopilotMessage} from "../../../../network/networkBus/src/messages/AutopilotMessage";

export const ExtraBox = observer<React.FC>(() => {
    const [values, setValues] = useState<AutopilotMessage>({} as AutopilotMessage);

    const valuesListener = (messageObj: AutopilotMessage) => {
        setValues({...values, ...messageObj});
    };
    useEffect(() => {
        onBusMessage(MessageEvents.AUTOPILOT, valuesListener);
        return () => offBusMessage(MessageEvents.AUTOPILOT, valuesListener);
    })

    return (
        <div>
            <ValueField label="Roll"><Color>{values.roll}</Color></ValueField>
            <ValueField label="Pitch"><Color>{values.pitch}</Color> </ValueField>
            <ValueField label="R State">{values.rudderState}</ValueField>
            <ValueField label="Cmps Dly">{values.compassDelay}</ValueField>
        </div>
    )
});




