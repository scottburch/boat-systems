const Col = require('react-bootstrap/lib/Col');
const Row = require('react-bootstrap/lib/Row');
const Grid = require('react-bootstrap/lib/Grid');
const Well = require('react-bootstrap/lib/Well');

const ValuesBox = require('./ValuesBox');
const ExtraBox = require('./ExtraBox');
const AdjustableValuesBox = require('./AdjustableValuesBox');
const PresetsSelect = require('./PresetsSelect');
import {Component} from "../../components/Component";
import {Maybe, Either} from 'simple-monads'
import {values, sendToAutopilot} from "../../stores/AutopilotClientStore";

export class AutopilotPage extends Component {

    constructor(props) {
        super(props);
        document.addEventListener('keyup', this.keyListener);
    }


keyListener(key) {
        key.code === 'KeyC' &&
        Either.of(values.get('course'))
            .cata(
                () => sendToAutopilot({course: values.get('heading')}),
                () => sendToAutopilot({course: undefined})
            );

        key.code === 'ArrowRight' && (
            Maybe.of(values.get('course'))
                .map(course => sendToAutopilot({course: course + 1}))
        );

        key.code === 'ArrowLeft' && (
            Maybe.of(values.get('course'))
                .map(course => sendToAutopilot({course: course - 1}))
        );
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
                <Row>
                    <Col xs={12}>
                        <Well>
                            LOG
                        </Well>
                    </Col>
                </Row>
            </Grid>
        );
    }
}

