const {sendMessage, onBusMessage} = require('../network/networkBus');

let heading = 0;

setInterval(() =>
    sendAHRS(++heading > 360 ? heading = 0 : heading)
, 50);

const seq = (() => {
    let s = 0;
    return () => s = s + 1;
})();

const sendAHRS = heading =>
    sendMessage('AHRS', {
        rawHeading: heading,
        heading: heading,
        roll: 3.22345234324,
        pitch: 3.234345666,
        compassTime: Date.now(),
    });

onBusMessage('RUDDER', (v) => console.log(Date.now() - v.time));


