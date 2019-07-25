import React from 'react'
import {Col, Row, Grid, Well} from 'react-bootstrap';
import {Component} from "../../components/Component";
import {Maybe, Either} from 'simple-monads'
import {values, sendToAutopilot} from "../../stores/AutopilotClientStore";
import {PresetsSelect} from './PresetsSelect'
import {ValuesBox} from "./ValuesBox";
import {AdjustableValuesBox} from "./AdjustableValuesBox";
import {ExtraBox} from "./ExtraBox";

export class AutopilotPage extends Component {

    constructor(props) {
        super(props);
        document.addEventListener('keyup', this.keyListener);
    }


keyListener(key) {
        if(key.shiftKey === false) {
            key.code === 'KeyC' &&
            Either.of(values.get('course'))
                .cata(
                    () => sendToAutopilot({course: values.get('heading')}),
                    () => sendToAutopilot({course: null})
                );

            key.code === 'ArrowRight' && (
                Maybe.of(values.get('course'))
                    .map(course => sendToAutopilot({course: course === 359 ? 0 : course + 1}))
            );

            key.code === 'ArrowLeft' && (
                Maybe.of(values.get('course'))
                    .map(course => sendToAutopilot({course: course ? course - 1 : 359}))
            );
        }
    }

    componentWillUnmount() {
        document.removeEventListener('keyup', this.keyListener);
    }

    render() {
        return (
            <Grid fluid>
                <Row>
                    <Col style={{paddingBottom: 5}}><PresetsSelect/></Col>
                </Row>
                <Row>
                    <Col xs={6}>
                        <Well>
                            <ValuesBox/>
                            <AdjustableValuesBox/>
                        </Well>
                    </Col>
                    <Col xs={6}>
                        <Well>
                            <ExtraBox/>
                        </Well>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

