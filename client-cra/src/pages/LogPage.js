import React from 'react'
import {observer} from 'mobx-react'
import {getLogMessages, clearLogMessages} from "../stores/LogStore";

export const LogPage = observer(() => (
    <div>
        <button onClick={clearLogMessages}>Clear</button>
        {
            getLogMessages().map((msg, idx) => (
                <div key={idx}>{msg.level}: {msg.msg}</div>
            ))
        }
    </div>
));
