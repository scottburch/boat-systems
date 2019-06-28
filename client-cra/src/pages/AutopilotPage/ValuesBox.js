import React from 'react'
import {Component} from "../../components/Component";
import {observer} from 'mobx-react'
import {values} from "../../stores/AutopilotClientStore";
import {ValueField} from "./ValueField";
import {Color} from "./Color";
import {isNil} from 'lodash'


export const ValuesBox = observer(class extends Component {
    render() {
        return (
            <div>
                <ValueField label="Course">{isNil(values.get('course')) ? '---': values.get('course') }</ValueField>
                <ValueField label="Heading">{values.get('heading')}</ValueField>

                <ValueField label="Error"><Color>{values.get('error')}</Color></ValueField>
                <ValueField label="Rudder"><Color>{values.get('course') === undefined ? 'N/A' : values.get('rudder')}</Color> </ValueField>
            </div>
        )
    }
});

