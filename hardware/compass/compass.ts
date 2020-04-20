import {onBusMessage} from "../../network/networkBus/network-bus";
import {MessageEvents} from "../../network/networkBus/MessageEvents";

const delay = require('delay');
const i2c = require('i2c-bus');
const {sendError, sendInfo} = require('../../network/logSender');
const {sendMessage} = require('../../network/networkBus/network-bus');

const PERIODIC_AUTOSAVE = 0x10;
const GYRO_CAL_ENABLE = 0x04;
const ACCEL_CAL_ENABLE = 0x02;
const MAG_CAL_ENABLE = 0x01;

const START_CALIBRATION = [0x98, 0x95, 0x99, 0x80 | ACCEL_CAL_ENABLE | MAG_CAL_ENABLE];
const STOP_CALIBRATION = [0x98, 0x95, 0x99, 0x80];
const STORE_PROFILE = [0xF0, 0xF5, 0xF6];
const ERASE_STORED_PROFILE = [0xe0, 0xe5, 0xe2];
const CMPS14_ADDR = 0x60;
const BEARING = 0x02;
const ROLL = 0x05;
const PITCH = 0x04;
const CALIBRATION_STATE = 0x1e;
let isCalibrating = false;

const i2c1 = i2c.openSync(1);


sendInfo('CMPS-14 compass running');

const writeCommand = async (bytes) => {
    for(const byte of bytes) {
        i2c1.writeByte(CMPS14_ADDR, 0x00, byte, () => {});
        await delay(20);
    }
};

const readWord = (register) => {
    const high = i2c1.readByteSync(CMPS14_ADDR, register);
    const low = i2c1.readByteSync(CMPS14_ADDR, register + 1);
    return ((high << 8) | low) / 10;
};

const readSigned = (register) =>
    new Int8Array([i2c1.readByteSync(CMPS14_ADDR, register)])[0];



const loop = async () => {
    while (true) {
        sendMessage('AHRS', {
            heading: readWord(BEARING),
            roll: readSigned(ROLL),
            pitch: readSigned(PITCH),
            compassTime: Date.now()
        });
        await delay(100);
    }
}


onBusMessage(MessageEvents.CALIBRATE_COMPASS, () => {
    isCalibrating = true;
     writeCommand(START_CALIBRATION);
     setTimeout(async () => {
        await writeCommand(STOP_CALIBRATION);
        await delay(1000);
        await writeCommand(STORE_PROFILE)
        isCalibrating = false;
     }, 10000);
});

onBusMessage(MessageEvents.GET_COMPASS_STATE, () => {
    const calibration = i2c1.readByteSync(CMPS14_ADDR, CALIBRATION_STATE);
    sendMessage(MessageEvents.COMPASS_STATE, {
        magCal: calibration & 3,
        accCal: (calibration & 0x0c) >> 2,
        gyroCal: (calibration & 0x30) >> 4,
        cmpCal: (calibration & 0xc0) >> 6,
        isCal: isCalibrating
    });
});

loop();



