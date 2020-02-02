import {initADS, readData, readRegister, Registers, setRegister} from "./ads1256";

initADS().then(async () => {
    setRegister(Registers.MUX, 0x04);
    console.log('MUX Register:', readRegister(Registers.MUX));


    setInterval(() => {
        const buf = readData(3);

        const perVolt = Math.pow(2, 21) / 2.5;

        console.log(buf, buf.readIntBE(0, 3)/perVolt);
    }, 500);
});