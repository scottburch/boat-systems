const i2c = require('i2c-bus');
const {sendError, sendInfo} = require('../../network/logSender');
const {sendMessage} = require('../../network/networkBus');
const utils = require('../rudderInterface/utils');

const CMPS14_ADDR = 0x60;
const BEARING = 0x02;
const ROLL = 0x05;
const PITCH = 0x04;

const i2c1 = i2c.openSync(1);

sendInfo('CMPS-14 compass running');


const loop = () => {
    sendMessage('AHRS', {
        heading: readWord(BEARING),
        roll: readSigned(ROLL),
        pitch: readSigned(PITCH),
        compassTime: Date.now()
    });
    setTimeout(loop, 100);
};

const readWord = (register) => {
    const high = i2c1.readByteSync(CMPS14_ADDR, register);
    const low = i2c1.readByteSync(CMPS14_ADDR, register + 1);
    return utils.fixed((high * 256 + low)/10, 1);
};

const readSigned = (register) => {
    let value = i2c1.readByteSync(CMPS14_ADDR, register);
    return value & 0x80 ? value - 256 : value;
};
loop();

