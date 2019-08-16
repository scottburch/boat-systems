import React from 'react'
import {isNumber} from 'lodash'
const utils = require('../../autopilot-utils');

export const Color = ({children}) => isNumber(children) ? colorIt(children) : 'N/A';

const colorIt = (num) => {
    const value = toFixed(num, 3);
    let color = 'black';
    num > 0 && (color = 'green');
    num < 0 && (color = 'red');

    return <span style={{color: color}}>{value}</span>
};

const toFixed =  (n, places) => parseFloat(parseFloat(n, 10).toFixed(places));
