import React from 'react'
import {isNumber} from 'lodash'

export const Color:React.FC<{children: any}> = ({children}) => isNumber(children) ? colorIt(children) : <span>N/A</span>;

const colorIt = (num: number) => {
    const value = toFixed(num, 3);
    let color = 'black';
    num > 0 && (color = 'green');
    num < 0 && (color = 'red');

    return <span style={{color: color}}>{value}</span>
};

const toFixed =  (n: number, places: number) => parseFloat(n.toFixed(places));
