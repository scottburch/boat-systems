import {Alert, Col, Container, Row} from "react-bootstrap";
import React from "react";
import {ValuesBox} from "./ValuesBox";
import {AdjustableValuesBox} from "./AdjustableValuesBox";
import {ExtraBox} from "./ExtraBox";
import {GlobalKeyListener} from "./GlobalKeyListener";


export const AutopilotPage = () => {

    return (
        <Container fluid>
            <GlobalKeyListener/>
            <Row>
                {/*<Col style={{paddingBottom: 5}}><PresetsSelect/></Col>*/}
            </Row>
            <Row>
                <Col xs={6}>
                    <Alert>
                        <ValuesBox/>
                        <AdjustableValuesBox/>
                    </Alert>
                </Col>
                <Col xs={6}>
                    <Alert>
                        <ExtraBox/>
                    </Alert>
                </Col>
            </Row>
        </Container>)
}