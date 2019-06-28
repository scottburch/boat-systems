import React from 'react'
import {Label} from "./Label"
import {Value} from "./Value"
import {Row} from 'react-bootstrap'

export const ValueField =  ({label, children}) => (
    <Row>
        <Label>{label}</Label>
        <Value>{children === undefined  ? 'undefined' : typeof children === 'object' ? children : children.toString()}</Value>
    </Row>
);

