import {AutopilotMessage} from "../../../network/networkBus/src/messages/AutopilotMessage";
import {useEffect} from "react";
import {sendMessage} from "../../services/communicationService";
import {MessageEvents} from "../../services/MessageEvents";
import {useMessageListener} from "../../components/custom-hooks/useBusListener";

const sendToAutopilot = (value) => {
    sendMessage(MessageEvents.AUTOPILOT, value);
}


export const GlobalKeyListener = () => {
    const [values] = useMessageListener<AutopilotMessage>(MessageEvents.AUTOPILOT);
    const myKeyListener = (key: KeyboardEvent) => {
        keyListener(key, values);
    }

    useEffect(() => {
        document.addEventListener('keyup', myKeyListener);
        return () => document.removeEventListener('keyup', myKeyListener)
    });

    return null;
}

const keyListener = (key: KeyboardEvent, values: AutopilotMessage) => {
    if (key.shiftKey === false) {
        key.code === 'KeyC' &&
            sendToAutopilot({course: values.course ? null : values.heading});

        if(key.code === 'ArrowRight' && typeof values.course === 'number') {
            const newCourse = values.course === 359 ? 0 : values.course + 1;
            sendToAutopilot({course: newCourse});
        }

        if(key.code === 'ArrowLeft' &&  typeof values.course === 'number') {
            sendToAutopilot({course: values.course ? values.course - 1 : 359});
        }
    }
}
