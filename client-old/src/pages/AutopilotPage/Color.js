const utils = require('../../../../autopilot/utils');

module.exports = ({children}) => _.isNumber(children) ? colorIt(children) : 'N/A';

const colorIt = (num) => {
    const value = utils.fixed(num, 3);
    let color = 'black';
    num > 0 && (color = 'green');
    num < 0 && (color = 'red');

    return <span style={{color: color}}>{value}</span>
};
