import React, {useState, useEffect} from 'react'
import {Button} from "react-bootstrap";

export const ToggleSwitch = ({children, system, withPasscode}) => {
    const [isOn, setOn] = useState(false);
    useEffect(() => {
        setTimeout(() => setOn(true), 5000);
    });

    const toggle = () => {

    };

    return (
        <>
            <Button variant="primary" onClick={toggle} active={isOn}>{children}</Button>
        </>
    )
};