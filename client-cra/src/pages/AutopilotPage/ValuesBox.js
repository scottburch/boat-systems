import React from 'react'
import {Component} from "../../components/Component";
import {observer} from 'mobx-react'
import {values} from "../../stores/AutopilotClientStore";
import {ValueField} from "./ValueField";
import {Color} from "./Color";


export const ValuesBox = observer(class extends Component {
    render() {
        return (
            <div>
                <ValueField label="Course">{values.get('course') !== undefined ? values.get('course') : 'N/A'}</ValueField>
                <ValueField label="Heading">{values.get('heading')}</ValueField>

                <ValueField label="Error"><Color>{values.get('error')}</Color></ValueField>
                <ValueField label="Rudder"><Color>{values.get('course') === undefined ? 'N/A' : values.get('rudder')}</Color> </ValueField>
            </div>
        )
    }
});

