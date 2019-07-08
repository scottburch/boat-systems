import {observer} from 'mobx-react'
import {Component} from 'react'
import {getLogMessages, clearLogMessages} from "../stores/LogStore";

@observer
export class LogPage extends Component {
    render() {
        return (
            <div>
                <button onClick={clearLogMessages}>Clear</button>
                {
                    getLogMessages().map((msg, idx) => (
                    <div key={idx}>{msg.level}: {msg.msg}</div>
                ))
                }
            </div>
        )
    }
}