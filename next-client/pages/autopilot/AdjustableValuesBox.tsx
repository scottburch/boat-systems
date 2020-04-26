import React, {useEffect, useState} from 'react'
import {ValueField} from "./ValueField";
import {sendMessage} from "../../services/communicationService";
import {MessageEvents} from "../../services/MessageEvents";
import {useMessageListener} from "../../components/custom-hooks/useBusListener";
import {AutopilotMessage} from "../../../network/networkBus/src/messages/AutopilotMessage";

const sendToAutopilot = (value) => {
    sendMessage(MessageEvents.AUTOPILOT, value);
}

const eventToString = require('key-event-to-string')({
    cmd: "cmd",
    ctrl: "ctrl",
    alt: "alt",
    shift: "shift",
    joinWith: "-"
});

const adjustableValues = [
    {key: 'rudderTime', text: 'RudderTime', inc: 10},
    {key: 'rudderWait', text: 'Rudder Wait', inc: 10},
    {key: 'kP', text: 'P', inc: 1},
    {key: 'kI', text: 'I', inc: 1},
    {key: 'kD', text: 'D', inc: 1},
];


export const AdjustableValuesBox = () => {
    const [values] = useMessageListener<AutopilotMessage>(MessageEvents.AUTOPILOT);
    const [itemIdx, setItemIdx] = useState(0);

    const onKeyUp = (ev: KeyboardEvent) => {
        const key = eventToString(ev);
        key === 'Up' && setItemIdx(itemIdx === 0 ? adjustableValues.length - 1 : itemIdx - 1);
        key === 'Down' && setItemIdx(itemIdx < (adjustableValues.length - 1) ? itemIdx + 1 : 0);
        key === 'shift-Left' && changeValue(-1);
        key === 'shift-Right' && changeValue();
    }

    const changeValue = (sign = 1) => {
        const item = adjustableValues[itemIdx];
        sendToAutopilot({[item.key]: values[item.key] + (item.inc) * sign});
    }


    useEffect(() => {
        document.addEventListener('keyup', onKeyUp);
        return () => document.removeEventListener('keyup', onKeyUp);
    })

    return (
        <div>
            {adjustableValues.map((v, idx) => (
                    <ValueField key={v.key} label={v.text}>
                            <span key={v.key} style={idx === itemIdx ? style.highlighted : {}}>
                                {values[v.key]}
                            </span>
                    </ValueField>
                )
            )}
        </div>
    )
}


// const values = {};
//
// export class AdjustableValuesBox extends Component {
//     private keyUpListener;
//
//     constructor(props) {
//         super(props);
//         this.state = {adjustableValueIdx: 0};
//         this.keyUpListener = this.onKeyUp.bind(this);
//         document.addEventListener('keyup', this.keyUpListener);
//     }
//
//     componentWillUnmount() {
//         document.removeEventListener('keyup', this.keyUpListener);
//     }
//
//     onKeyUp(ev) {
//         const key = eventToString(ev);
//         key === 'Down' && setItemIdx(itemthis.setState({adjustableValueIdx: this.values.adjustableValueIdx < adjustableValues.length - 1 ? this.state.adjustableValueIdx + 1 : 0});
//         ;
//         key === 'Up' && this.upArrow();
//         key === 'shift-Left' && this.shiftLeft();
//         key === 'shift-Right' && this.shiftRight();
//     }
//
//     downArrow() {
//         this.setState({adjustableValueIdx: this.values.adjustableValueIdx < adjustableValues.length - 1 ? this.state.adjustableValueIdx + 1 : 0});
//     }
//
//     upArrow() {
//         this.setState({adjustableValueIdx: this.state.adjustableValueIdx === 0 ? Object.keys(adjustableValues).length - 1 : this.state.adjustableValueIdx - 1});
//     }
//
//     shiftLeft() {
//         const item = adjustableValues[this.state.adjustableValueIdx];
//         sendToAutopilot({[item.key]: values.get(item.key) - item.inc});
//     }
//
//     shiftRight() {
//         const item = adjustableValues[this.state.adjustableValueIdx];
//         sendToAutopilot({[item.key]: values.get(item.key) + item.inc});
//     }
//
//     render() {
//         return (
//             <div>
//                 {adjustableValues.map((v, idx) => {
//                     return (
//                         <ValueField key={v.key} label={v.text}>
//                             <span key={v.key} style={idx === this.state.adjustableValueIdx ? style.highlighted : {}}>
//                                 {values.get(v.key)}
//                             </span>
//                         </ValueField>
//                     )
//                 })}
//             </div>
//         )
//     }
// }
//
const style = {
    highlighted: {
        backgroundColor: 'black',
        color: 'white'
    }
};


