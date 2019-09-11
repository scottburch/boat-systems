const i2c = require('i2c-bus');
const {sendError, sendInfo} = require('../../network/logSender');
const {sendMessage} = require('../../network/networkBus/network-bus');


const PERIODIC_AUTOSAVE = 0x10;
const GYRO_CAL_ENABLE = 0x04;
const ACCEL_CAL_ENABLE = 0x02;
const MAG_CAL_ENABLE = 0x01;

const AUTO_CALIBRATION = [0x98, 0x95, 0x99, 0x80 | PERIODIC_AUTOSAVE | ACCEL_CAL_ENABLE | MAG_CAL_ENABLE];
const ERASE_STORED_PROFILE = [0xe0, 0xe5, 0xe2];
const CMPS14_ADDR = 0x60;
const BEARING = 0x02;
const ROLL = 0x05;
const PITCH = 0x04;
const CALIBRATION_STATE = 0x1e;

const i2c1 = i2c.openSync(1);


sendInfo('CMPS-14 compass running');


const sendCalibration = () => {
    sendInfo(`Magnetometer calibration ${i2c1.readByteSync(CMPS14_ADDR, CALIBRATION_STATE) & 3}`);
    sendInfo(`Accelerometer calibration ${(i2c1.readByteSync(CMPS14_ADDR, CALIBRATION_STATE) & 0x0c) >> 2}`);
    sendInfo(`Gyro calibration state ${(i2c1.readByteSync(CMPS14_ADDR, CALIBRATION_STATE) & 0x30) >> 4}`);
    sendInfo(`Compass calibration state ${(i2c1.readByteSync(CMPS14_ADDR, CALIBRATION_STATE) & 0xc0) >> 6}`);
};

setInterval(sendCalibration, 300 * 1000);


const writeCommand = (bytes) => {

    const response = i2c1.writeByteSync(CMPS14_ADDR, 0x00, bytes.shift());
    bytes.length && setTimeout(() => writeCommand(bytes), 20);
};

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
    return ((high << 8) | low)/10;
};

const readSigned = (register) =>
    new Int8Array([i2c1.readByteSync(CMPS14_ADDR, register)])[0];


loop();
// This did not work, so I wrote Arduino code to turn on calibration.
//writeCommand(AUTO_CALIBRATION);


// erase the stored profile
//writeCommand(ERASE_STORED_PROFILE);
