import React from 'react'
const Col = require('react-bootstrap/lib/Col');

export const Label = ({children}) => (
    <Col xs={4}><label>{children}:</label></Col>
);