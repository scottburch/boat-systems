import React, {useEffect} from 'react'
import {Alert, Col, Container, Row} from 'react-bootstrap';
import {sendToAutopilot} from "../../stores/AutopilotClientStore";
//import {PresetsSelect} from './PresetsSelect'
import {ExtraBox} from "./ExtraBox";
import {AutopilotMessage} from "../../../../network/networkBus/src/messages/AutopilotMessage";
import {MessageEvents} from "../../../../network/networkBus/src/MessageEvents";
import {useMessageListener} from "../../services/useBusListener";

const {Maybe, Either} = require('simple-monads');

export const AutopilotPage = () => {

    const [values, setValues] = useMessageListener<AutopilotMessage>(MessageEvents.AUTOPILOT);

    const myKeyListener = (key: KeyboardEvent) => {
        keyListener(key, values as AutopilotMessage);
    }

    useEffect(() => {
        document.addEventListener('keyup', myKeyListener);
        return () => document.removeEventListener('keyup', myKeyListener)
    });

    return (
        <Container fluid>
            <Row>
                {/*<Col style={{paddingBottom: 5}}><PresetsSelect/></Col>*/}
            </Row>
            <Row>
                <Col xs={6}>
                    <Alert>
                        {/*                        <ValuesBox/>*/}
                        {/*<AdjustableValuesBox/>*/}
                    </Alert>
                </Col>
                <Col xs={6}>
                    <Alert>
                        <ExtraBox/>
                    </Alert>
                </Col>
            </Row>
        </Container>
    )

}

const keyListener = (key: KeyboardEvent, values: AutopilotMessage) => {
    if (key.shiftKey === false) {
        key.code === 'KeyC' &&
        Either.of(values.course)
            .cata(
                () => sendToAutopilot({course: values.heading}),
                () => sendToAutopilot({course: null})
            );

        key.code === 'ArrowRight' && (
            Maybe.of(values.course)
                .map((course: number) => course === 359 ? 0 : course + 1)
                .map((course: number) => {
                    values.course = course;
                    return course;
                })
                .map((course: number) => sendToAutopilot({course}))
        );

        key.code === 'ArrowLeft' && (
            Maybe.of(values.course)
                .map((course: number) => sendToAutopilot({course: course ? course - 1 : 359}))
        );
    }
}

