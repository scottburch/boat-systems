const ValueField = require('./ValueField');
const Color = require('./Color');
const utils = require('../../../../autopilot/utils');
import {Component} from "../../components/Component";
import {values} from "../../stores/AutopilotClientStore";
import {observer} from 'mobx-react'
import {autorun, extendObservable} from 'mobx'
import {Maybe} from 'simple-monads'

@observer
class ExtraBox extends Component {

    constructor(props) {
        super(props);
        values.get('voltage') || values.set('voltage', 1023);
        setInterval(() => this.setState({minHz: 999999}), 5000);

        this.stop = autorun(() => {

            const [hz, delay] = [
                values.get('hz'),
                values.get('compassDelay')
            ];
            this.mounted ? (
                this.setState({
                    minHz: Math.min(values.get('hz'), this.state.minHz),
                    maxDly: isNaN(this.state.maxDly) ? 0 : Math.max(delay, this.state.maxDly),
                })
            ) : (
                this.state = {
                    minHz: 999999,
                    maxDly: 0
                }
            )
        })
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.stop();
    }

    convertToVolts(num) {
        return utils.fixed((num * .0049) * (1000 + 220) / 220);
    }


    render() {
        return (
            <div>
                <ValueField label="Yaw Speed"><Color>{values.get('yawSpeed')}</Color></ValueField>
                <ValueField label="Roll"><Color>{values.get('roll')}</Color></ValueField>
                <ValueField label="Pitch"><Color>{values.get('pitch')}</Color> </ValueField>
                <ValueField label="HZ">{values.get('hz')}</ValueField>
                <ValueField label="Min HZ">{this.state.minHz}</ValueField>
                <ValueField label="R State">{values.get('rudderState')}</ValueField>
                <ValueField label="Base">{values.get('prevBase')}</ValueField>
                <ValueField label="Tach">{values.get('prevTach')}</ValueField>
                <ValueField label="Speed">{values.get('prevSpeed')}</ValueField>
                <ValueField label="Cmps Dly">{values.get('compassDelay')}</ValueField>
                <ValueField label="Max Dly">{this.state.maxDly}</ValueField>
                <ValueField label="Voltage">{this.convertToVolts(values.get('volts'))} ({this.convertToVolts(values.get('minVolts'))}-{this.convertToVolts(values.get('maxVolts'))})</ValueField>
            </div>
        )
    }
};

module.exports = ExtraBox;


