import React, {useEffect, useState} from 'react'
import {ValueField} from "./ValueField";
import {Color} from "./Color";
import {MessageEvents} from "../../services/MessageEvents";
import {AutopilotMessage} from "../../../network/networkBus/src/messages/AutopilotMessage";
import {useMessageListener} from "../../components/custom-hooks/useBusListener";

export const ExtraBox = () => {
    const [values] = useMessageListener<AutopilotMessage>(MessageEvents.AUTOPILOT);

    return (
        <div>
            <ValueField label="Roll"><Color>{values.roll}</Color></ValueField>
            <ValueField label="Pitch"><Color>{values.pitch}</Color> </ValueField>
            <ValueField label="R State">{values.rudderState}</ValueField>
            <ValueField label="Cmps Dly">{values.compassDelay}</ValueField>
        </div>
    )
};




