const {sendMessage, onBusMessage} = require('../../network/networkBus/network-bus');
const {changeScheduler} = require('../../utils/changeScheduler');

const i2c = require('i2c-bus');
const i2c1 = i2c.openSync(1);


const myChangeScheduler = changeScheduler('AHRS');
const SET_RUDDER_CMD = 0x00;
const RUDDER_CONTROLLER = 0x04;

onBusMessage('RUDDER', ({rudder}) => {
    arduinoRequest(RUDDER_CONTROLLER, SET_RUDDER_CMD, numToByteArray(rudder));
});


const numToByteArray = n => {
    n = n & 0xffff;
    return [n & 0xff, (n >> 8) & 0xff];
};

const arduinoRequest = (addr, cmd, data = []) => new Promise((resolve) =>{
    i2c1.i2cWriteSync(addr, data.length + 1, Buffer.from([cmd, ...data]));
    setTimeout(() => resolve(i2c1.receiveByteSync(addr)))
});


