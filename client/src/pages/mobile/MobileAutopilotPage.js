import React, {useState} from 'react'
import {values} from "../../stores/AutopilotClientStore";
import {observer} from "mobx-react";
import {sendMessage} from "../../services/communicationService";

export const MobileAutopilotPage = observer(() => {
    return (
        <>
            <p>
                <button onClick={toggleAutopilot}>
                    {values.get('course') ? 'On' : 'Off'}
                </button>
                </p>
            <p>Course: {values.get('course')}</p>
            <p>Heading: {values.get('heading')}</p>
            <p>Error: {values.get('error')}</p>
            <p>
                <button onClick={() => move(-1)}>{'<--'}</button>
                <button onClick={() => move(1)}>{'-->'}</button>
            </p>
        </>
    )
});

const move = (way) => values.get('course') && sendToAutopilot({course: values.get('course') + way});

const toggleAutopilot = () => values.get('course') ?
    sendToAutopilot({course: null}) :
    sendToAutopilot({course: values.get('heading')});

export const sendToAutopilot = data => sendMessage('AUTOPILOT', {data});
