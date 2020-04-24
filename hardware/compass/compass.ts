import {onBusMessage} from "../../network/networkBus/src/network-bus";
import {MessageEvents} from "../../network/networkBus/src/MessageEvents";
import {AHRSMessage} from "../../network/networkBus/src/messages/AHRSMessage";
import {PromisifiedBus} from "i2c-bus";
import {CompassCalibrationMessage} from "../../network/networkBus/src/messages/CompassCalibrationMessage";

const delay = require('delay');
const i2c = require('i2c-bus');
const {sendError, sendInfo} = require('../../network/logSender');
const {sendMessage} = require('../../network/networkBus/src/network-bus');

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

(async () => {
    const i2c1:PromisifiedBus = await i2c.openPromisified(1);

    sendInfo('CMPS-14 compass running');

    const writeCommand = async (bytes): Promise<void> => {
        for (const byte of bytes) {
//            const start = Date.now();
            await i2c1.writeByte(CMPS14_ADDR, 0x00, byte);
            // We want a total delay of 20ms between byte writes;
//            await delay(20 - (Date.now() - start));
            await delay(20);
        }
    };

    const readWord = async (register): Promise<number> => {
        const high = await i2c1.readByte(CMPS14_ADDR, register);
        const low = await i2c1.readByte(CMPS14_ADDR, register + 1);
        return ((high << 8) | low) / 10;
    };

    const readSigned = async (register): Promise<number> =>
        new Int8Array([await i2c1.readByte(CMPS14_ADDR, register)])[0];


    const loop = async () => {
        while (true) {
            sendMessage('AHRS', {
                heading: await readWord(BEARING),
                roll: await readSigned(ROLL),
                pitch: await readSigned(PITCH),
                compassTime: Date.now()
            } as AHRSMessage);
            await delay(100);
        }
    }


    onBusMessage(MessageEvents.CALIBRATE_COMPASS, async (): Promise<void> => {
        isCalibrating = true;
        await doCalibration();
        await writeCommand(STOP_CALIBRATION);
        await writeCommand(STORE_PROFILE);
        isCalibrating = false;
    });

    const doCalibration = async (): Promise<void> => {
        await writeCommand(START_CALIBRATION);
        do {
            await delay(500);
        } while (await isCalibrated() === false)

    }

    const isCalibrated = async ():Promise<boolean> =>
        await getCalibrationInfo()
            .then(info => info.magCal === 3 && info.accCal === 3 && info.cmpCal === 3);

    onBusMessage(MessageEvents.GET_COMPASS_STATE, async (): Promise<void> => {
        sendMessage(MessageEvents.COMPASS_STATE, await getCalibrationInfo());
    });

    const getCalibrationInfo = async (): Promise<CompassCalibrationMessage> => {
        const calibration = await i2c1.readByte(CMPS14_ADDR, CALIBRATION_STATE);
        return {
            magCal: calibration & 3,
            accCal: (calibration & 0x0c) >> 2,
            gyroCal: (calibration & 0x30) >> 4,
            cmpCal: (calibration & 0xc0) >> 6,
            isCal: isCalibrating
        };
    }

    loop();
})()


