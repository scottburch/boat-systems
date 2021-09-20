import {PromisifiedBus} from "i2c-bus";

const {sendMessage, onBusMessage} = require('../../network/networkBus/src/network-bus');
const {changeScheduler} = require('../../common/changeScheduler');

import i2c = require('i2c-bus');
import delay = require("delay");

(async () => {
    const i2c1: PromisifiedBus = await i2c.openPromisified(1);


    const myChangeScheduler = changeScheduler('AHRS');
    const SET_RUDDER_CMD = 0x00;
    const RUDDER_CONTROLLER = 0x04;

    onBusMessage('RUDDER', ({rudder}) => {
        arduinoRequest(RUDDER_CONTROLLER, SET_RUDDER_CMD, numToByteArray(rudder));
    });


    const numToByteArray = (n): number[] => {
        n = n & 0xffff;
        return [n & 0xff, (n >> 8) & 0xff];
    };

    const arduinoRequest = async (addr, cmd, data: number[] = []) => {
        await i2c1.i2cWrite(addr, data.length + 1, Buffer.from([cmd, ...data]));
        delay(1);
        return await i2c1.receiveByte(addr);
    };
})()

