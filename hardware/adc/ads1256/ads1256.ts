const spi = require('spi-device');
const Gpio = require('onoff').Gpio;
const {times} = require('lodash');
const pressAnyKey = require('press-any-key');

const ADS_RDY_PIN = new Gpio(17, 'in', 'both');
const ADS_RST_PIN = new Gpio(18, 'out');
const ADS_CS_PIN = new Gpio(22, 'out');
const DA_CS_PIN = new Gpio(23, 'out');
const CAL_PIN = new Gpio(4, 'out');

const hardReset = async () => {
    console.log('Resetting ADC...');
    const start = Date.now();
    ADS_RST_PIN.writeSync(0);
    await delay();
    ADS_RST_PIN.writeSync(1);
    waitForDataReady();
    console.log('done', `${(Date.now() - start) / 1000}sec`)
};

export const initADS = async () => {
    console.log("Initializing ADS");
    await hardReset();
    await delay(150);

    DA_CS_PIN.writeSync(1);
    ADS_CS_PIN.writeSync(0);

    setRegister(Registers.AD_DATA_RATE, 0xC1); // lower sample rate

    await systemCalibration();

//    autoCalibrate();
};


const systemCalibration = async () => {
    console.log('System calibration');
    console.log('Applying max voltage');
    CAL_PIN.writeSync(0); // apply 3 volts to AD0 input
    await delay(500);
    spiSend([{bytes: [Commands.SYSGCAL]}]);
    waitForDataReady();

    console.log('Applying min voltage');
    CAL_PIN.writeSync(1);
    await delay(500);
    spiSend([{bytes: [Commands.SYSOCAL]}]);
    waitForDataReady();
};

const autoCalibrate = () => {
    console.log('Starting calibration...');
    const start = Date.now();
    spiSend([{
        bytes: [Commands.SELFCAL]
    }]);
    waitForDataReady();
    console.log('Calibration complete:', `${(Date.now() - start) / 1000}sec`)
};

export const waitForDataReady = () => {
    while (ADS_RDY_PIN.readSync()) {
    }
};

const delay = (ms: number = 1): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));


interface MessagePart {
    sendBuffer: Buffer,
    receiveBuffer: Buffer,
    byteLength: number,
    speedHz: number,
    microSecondDelay: number
}

interface SpiSendProps {
    bytes: number[],
    delay?: number
}


export const spiSend = (parts: SpiSendProps[]): Buffer => {
    waitForDataReady();
    const message: MessagePart[] = parts.map(({bytes, delay = 0}) => ({
        sendBuffer: Buffer.from(bytes),
        receiveBuffer: Buffer.alloc(bytes.length),
        byteLength: bytes.length,
        speedHz: 20000,
        microSecondDelay: delay
    }));
    getSpi().transferSync(message);
    const length = message.reduce((size: number, {receiveBuffer}) => size + receiveBuffer.byteLength, 0);
    return Buffer.concat(message.map<Buffer>(({receiveBuffer}) => receiveBuffer), length)
};

const getSpi = () => spi.openSync(0, 0, {mode: spi.MODE1});


export enum Commands {
    READ_DATA = 0x01,
    READ_REGISTER = 0x10,
    WRITE_REGISTER = 0x50,
    SYNC = 0xFC,
    WAKEUP = 0x00,
    SHIFT_BYTE = 0x00,
    SELFCAL = 0xF0,
    SYSOCAL = 0xF3,
    SYSGCAL = 0xF4
}

export enum Registers {
    STATUS = 0x00,
    MUX = 0x01,
    AD_CONTROL = 0x02,
    AD_DATA_RATE = 0x03,
    GPIO_CONTROL = 0x04
}


export const setRegister = (register: number, value: number): Buffer => {
    return spiSend([{
        bytes: [Commands.WRITE_REGISTER | register, 0],
        delay: 10
    }, {
        bytes: [value]
    }])
};

export const readRegister = (register: number): Buffer => {
    spiSend([{
        bytes: [Commands.READ_REGISTER | register, 0],
        delay: 10
    }]);

    return spiSend([{
        bytes: [0]
    }])
};

export const readData = (bytes: number): Buffer => {
    const request: SpiSendProps[] = [{
        bytes: [Commands.SYNC],
        delay: 10
    }, {
        bytes: [Commands.WAKEUP],
        delay: 10
    }, {
        bytes: [Commands.READ_DATA],
        delay: 10
    }];
    times(bytes, () => request.push({bytes: [Commands.SHIFT_BYTE]}));
    return spiSend(request).slice(3);

};





