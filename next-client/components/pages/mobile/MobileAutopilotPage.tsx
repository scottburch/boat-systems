import React from 'react'
import {sendMessage} from "../../../services/communicationService";
import {AutopilotMessage} from "../../../../network/networkBus/src/messages/AutopilotMessage";
import {useMessageListener} from "../../custom-hooks/useBusListener";
import {MessageEvents} from "../../../services/MessageEvents";

export const MobileAutopilotPage = () => {
    const [values, setValues] = useMessageListener<AutopilotMessage>(MessageEvents.AUTOPILOT);
    return (
        <div style={{fontSize: 30, paddingLeft: 50, paddingTop: 50}}>
            <p>
                <button onClick={() => toggleAutopilot(values)}>
                    {values.course ? 'On' : 'Off'}
                </button>
                </p>
            <p>Course: {values.course}</p>
            <p>Heading: {values.heading}</p>
            <p>Error: <span  style={{color: values.error < 0 ? 'red': 'green'}}>{values.error}</span></p>
            <p>
                <button onClick={() => move(-1, values, setValues)}>{'<--'}</button>
                <button style={{marginLeft: 50}} onClick={() => move(1, values, setValues)}>{'-->'}</button>
            </p>
        </div>
    )
};

const move = (direction: number, values: AutopilotMessage, setValues) => {
    let course = values.course;
    course += direction;
    course > 359 && (course = 0);
    course < 0 && (course = 359);
    sendToAutopilot({course});
    setValues({...values, course});
};

const toggleAutopilot = (values: AutopilotMessage) => values.course ?
    sendToAutopilot({course: null}) :
    sendToAutopilot({course: values.heading});

export const sendToAutopilot = data => sendMessage(MessageEvents.AUTOPILOT, data);
