import React from 'react'
import {Component} from "../../components/Component";
import {values} from "../../stores/AutopilotClientStore";
import {observer} from 'mobx-react'
import {ValueField} from "./ValueField";
import {Color} from "./Color";


export const ExtraBox = observer(class ExtraBox extends Component {

    constructor(props) {
        super(props);
        values.get('voltage') || values.set('voltage', 1023);

        this.maxDly = 0;
        this.maxMaxDly = 0;
        this.minHz = 999999;

        setInterval(() => this.minHz = 999999, 5000);
        setInterval(() => {
            this.maxMaxDly = Math.max(this.maxMaxDly, this.maxDly);
            this.maxDly = 0;
        }, 1000 * 60 * 5);
    }

    render() {
        this.maxDly = isNaN(this.maxDly) ? 0 : Math.max(values.get('compassDelay'), this.maxDly);
        this.minHz = Math.min(values.get('hz'), this.minHz);
        return (
            <div>
                <ValueField label="Roll"><Color>{values.get('roll')}</Color></ValueField>
                <ValueField label="Pitch"><Color>{values.get('pitch')}</Color> </ValueField>
                <ValueField label="HZ">{values.get('hz')}</ValueField>
                <ValueField label="Min HZ">{this.minHz}</ValueField>
                <ValueField label="R State">{values.get('rudderState')}</ValueField>
                <ValueField label="Base">{values.get('prevBase')}</ValueField>
                <ValueField label="Tach">{values.get('prevTach')}</ValueField>
                <ValueField label="Speed">{values.get('prevSpeed')}</ValueField>
                <ValueField label="Cmps Dly">{values.get('compassDelay')}</ValueField>
                <ValueField label="Max Dly">{this.maxDly} ({this.maxMaxDly})</ValueField>
            </div>
        )
    }
});



