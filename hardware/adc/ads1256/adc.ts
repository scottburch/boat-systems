import {initADS, readData, readRegister, Registers, setRegister} from "./ads1256";

const MAX_VOLTS: number = 5;
const perVolt: number = Math.pow(2, 23) / MAX_VOLTS;


const setMux = (MUX: number): Buffer => setRegister(Registers.MUX, MUX);

const readValue = (): number => readData(3).readIntBE(0, 3)/perVolt;

const valueToAmps = (value: number): number => value / (.05/500);

initADS().then(() => {
    const Ain0 = voltageDivider(1200, 200);

    setInterval(async () => {
        setMux(0x10); // volts mux
        const amps = valueToAmps(readValue());
        setMux(0x32); // amps mux
        const volts = Ain0(readValue())
        console.log(volts.toFixed(2), amps.toFixed(2));
    }, 500);
});

type VoltageDividerFunction = (value: number) => number

const voltageDivider = (R1: number, R2: number): VoltageDividerFunction =>
    (value: number): number => (((value) * (R1 + R2)) / R2);


