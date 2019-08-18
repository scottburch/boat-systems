import React from 'react'
import {Col} from 'react-bootstrap'

export const Label = ({children}) => (
    <Col xs={4}><label>{children}:</label></Col>
);