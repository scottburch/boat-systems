import {observer} from 'mobx-react'
import {Component} from 'react'
import {getLogMessages} from "../stores/LogStore";

@observer
export class LogPage extends Component {
    render() {
        return getLogMessages().map((msg, idx) => (
            <div key={idx}>{msg.data.msg}</div>
        ))
    }
}