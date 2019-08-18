import React from 'react'
import {Component} from "../../components/Component";
import {observer} from 'mobx-react'
import {sendToAutopilot, values} from "../../stores/AutopilotClientStore";
import {Maybe} from 'simple-monads'
import {DropdownButton} from "react-bootstrap";
import {Dropdown} from 'react-bootstrap'

const presets = require('../../presets');

const _ = require('lodash');

export const PresetsSelect = observer(class extends Component {

    updatePresets(preset) {
        sendToAutopilot({preset: preset});
    }

    render() {
        return Maybe.of(values.get('preset'))
            .map(preset => (
                <DropdownButton id="preset-select" onSelect={this.updatePresets.bind(this)} title={_.get(presets[preset], 'text')}>
                    {_.map(presets, (v, k) => <Dropdown.Item key={k} eventKey={k}>{v.text}</Dropdown.Item>)}
                </DropdownButton>
            ))
            .getOrElse(null);
    }
});

