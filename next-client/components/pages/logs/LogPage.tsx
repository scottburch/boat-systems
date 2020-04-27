import React from 'react'
import {MessageEvents} from "../../../services/MessageEvents";
import {useMessageListener} from "../../custom-hooks/useBusListener";
import {LogMessage} from "../../../../network/networkBus/src/messages/LogMessage";

let logs = [];

export const LogPage = () => {
    const [log] = useMessageListener<LogMessage>(MessageEvents.LOG)
    log && log.level && logs.push(log);
    return (
        <div>
            <button onClick={() => logs = []}>Clear
            </button>
            {
                logs.map(({level, msg, time}, idx) => (
                    <div key={time}>{level}: {msg}</div>
                ))
            }
        </div>
    )
};
