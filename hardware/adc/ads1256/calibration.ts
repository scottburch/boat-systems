import {Commands, initADS, readData, readRegister, Registers, setRegister, spiSend, waitForDataReady} from "./ads1256";
const pressAnyKey = require('press-any-key');

initADS()
    .then(() => pressAnyKey('Set max voltage:'))
    .then(() => {
        spiSend([{
            bytes: [Commands.SYSGCAL]
        }]);
        waitForDataReady();
    })
    .then(() => pressAnyKey('Set 0 voltage'))
    .then(() => {
        spiSend([{
            bytes: [Commands.SYSOCAL]
        }]);
        waitForDataReady();
    })
    .then(() => {
        [5,6,7,8,9,10].forEach(add => console.log(`register ${add}:`, readRegister(add)))
    })
    .then(() => {
        setRegister(Registers.MUX, 0x04);
        console.log('MUX Register:', readRegister(Registers.MUX));


        setInterval(() => {
            const buf = readData(3);

            const perVolt = Math.pow(2, 23) / 5;

            console.log(buf, buf.readIntBE(0, 3)/perVolt);
        }, 500);
    });

