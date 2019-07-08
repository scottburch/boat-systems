import React from 'react'
import {Component} from "../../components/Component";
import {observer} from 'mobx-react'
import {sendToAutopilot, values} from "../../stores/AutopilotClientStore";
import {Maybe} from 'simple-monads'

const presets = require('../../presets');

const _ = require('lodash');
const DropdownButton = require('react-bootstrap/lib/DropdownButton');
const MenuItem = require('react-bootstrap/lib/MenuItem');

export const PresetsSelect = observer(class extends Component {

    updatePresets(preset) {
        sendToAutopilot({preset: preset});
    }

    render() {
        return Maybe.of(values.get('preset'))
            .map(preset => (
                <DropdownButton id="preset-select" onSelect={this.updatePresets.bind(this)} title={_.get(presets[preset], 'text')}>
                    {_.map(presets, (v, k) => <MenuItem key={k} eventKey={k}>{v.text}</MenuItem>)}
                </DropdownButton>
            ))
            .getOrElse(null);
    }
});

