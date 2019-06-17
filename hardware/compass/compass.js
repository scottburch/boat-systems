const i2c = require('i2c-bus');

const {sendError, sendInfo} = require('../../network/logSender');
const {sendMessage} = require('../../network/networkBus');


const CMPS14_ADDR = 0x60;
const CMD_VERSION = 0x00;
const CMD_BEARING_HIGH = 0x02;
const CMD_BEARING_LOW = 0x03;

const i2c1 = i2c.openSync(1);

console.log('version', i2c1.readByteSync(CMPS14_ADDR, CMD_VERSION));


const loop = () => {
    const high = i2c1.readByteSync(CMPS14_ADDR, CMD_BEARING_HIGH);
    const low = i2c1.readByteSync(CMPS14_ADDR, CMD_BEARING_LOW);

    console.log(((high * 256 + low)/10).toFixed(1));

    sendMessage('AHRS', {
        heading: utils.fixed((high * 256 + low)/10, 1),
        // roll: parseFloat(roll, 10),
        // pitch: parseFloat(pitch, 10),
        // compassTime: time
    });
    setTimeout(loop, 100);
};


loop();

