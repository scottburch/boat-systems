import React from 'react'
import {ValueField} from "./ValueField";
import {Color} from "./Color";
import {isNil} from 'lodash'
import {useMessageListener} from "../../custom-hooks/useBusListener";
import {AutopilotMessage} from "../../../../network/networkBus/src/messages/AutopilotMessage";
import {MessageEvents} from "../../../services/MessageEvents";

export const ValuesBox = () => {
    const [values] = useMessageListener<AutopilotMessage>(MessageEvents.AUTOPILOT);

    return (
        <div>
            <ValueField label="Course">{isNil(values.course) ? '---' : values.course}</ValueField>
            <ValueField label="Heading">{values.heading}</ValueField>

            <ValueField label="Error"><Color>{values.error}</Color></ValueField>
            <ValueField label="Rudder"><Color>{values.course === undefined ? 'N/A' : values.rudder}</Color> </ValueField>
        </div>
    )
}


