import React, {useState} from 'react'
import {values} from "../../stores/AutopilotClientStore";
import {observer} from "mobx-react";
import {sendMessage} from "../../services/communicationService";
import {isNumber} from 'lodash'

export const MobileAutopilotPage = observer(() => {
    return (
        <div style={{fontSize: 30, paddingLeft: 50, paddingTop: 50}}>
            <p>
                <button onClick={toggleAutopilot}>
                    {values.get('course') ? 'On' : 'Off'}
                </button>
                </p>
            <p>Course: {values.get('course')}</p>
            <p>Heading: {values.get('heading')}</p>
            <p>Error: <span  style={{color: values.get('error') < 0 ? 'red': 'green'}}>{values.get('error')}</span></p>
            <p>
                <button onClick={() => move(-1)}>{'<--'}</button>
                <button style={{marginLeft: 50}} onClick={() => move(1)}>{'-->'}</button>
            </p>
        </div>
    )
});

const move = direction => {
    let course = values.get('course');
    course += direction;
    course > 359 && (course = 0);
    course < 0 && (course = 359);
    sendToAutopilot({course});
};

const toggleAutopilot = () => values.get('course') ?
    sendToAutopilot({course: null}) :
    sendToAutopilot({course: values.get('heading')});

export const sendToAutopilot = data => sendMessage('AUTOPILOT', {data});
