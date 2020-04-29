import {ArrowImg} from './ArrowImg'
import {useMessageListener} from "../../custom-hooks/useBusListener";
import {AHRSMessage} from "../../../../network/networkBus/src/messages/AHRSMessage";
import {MessageEvents} from "../../../services/MessageEvents";

export const CompassArrow = () => {
    const [ahrs] = useMessageListener<AHRSMessage>(MessageEvents.AHRS);
    return (
        <span style={{display: "inline-block", transform: `rotate(${ahrs.heading}deg)`}}>
            <ArrowImg />
        </span>
    )
}