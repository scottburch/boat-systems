const utils = require('./utils');
const {sendError, sendInfo} = require('../../network/logSender');
const {sendMessage, onBusMessage} = require('../../network/networkBus');
const {changeScheduler} = require('../../utils/changeScheduler');
const fse = require('fs-extra');

const _ = require('lodash');

let port;
const SerialPort = require('serialport');

start();

const myChangeScheduler = changeScheduler('AHRS');

function findPort() {
    return ['/dev/tty.usbserial-A4007c47', '/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A4007c47-if00-port0']
        .find(file => fse.existsSync(file));
}

function start() {
    const dev = findPort();
    const parser = new SerialPort.parsers.Readline();
    port = new SerialPort(dev, {
        baudRate: 115200,
    });
    port.pipe(parser);


    port.on('error', (err) => {
        sendError(`${process.argv[1]}: ${err.toString()}`);
        setTimeout(start, 5000);
    });


    port.on("open", function () {
        console.log('port open');

        parser.on('data', function (string) {
            string = _.trim(string);
            if (/[A-Z0-9]+\:/.test(string)) {
                const [prefix, data] = string.split(':');
                switch (prefix) {
                    case 'AHRS':
                        compass(data);
                        break;
                    case 'D':
                        try {
                            sendMessage('COMPASS_DELAY', {delay: parseInt(data)});
                        } catch (e) {
                        }
                        break;
                    case 'HZ':
                        myChangeScheduler('hz', data);
                        break;
                    case 'B' :
                        myChangeScheduler('prevBase', data);
                        break;
                    case 'T':
                        myChangeScheduler('prevTach', data);
                        break;
                    case 'S':
                        myChangeScheduler('prevSpeed', data);
                        break;
                    case 'V':
                        const [volts, minVolts, maxVolts] = data.split(',');
                        myChangeScheduler('volts', volts);
                        myChangeScheduler('minVolts', minVolts);
                        myChangeScheduler('maxVolts', maxVolts);
                        break;
                    case 'L':
                        console.log('Log:', data);
                        break;
                    default:
                        sendInfo(`UNKNOWN: ${string}`);
                }
            } else {
                sendInfo(`DATA: ${string}`);
            }
        });

        onBusMessage('RUDDER', v => {
            port.write(`R:${v.rudder}!`);
            port.write(`P:${v.time}!`);
        });
    });


    function compass(data) {
        const [roll, pitch, yaw, time] = data.split(',');
        sendMessage('AHRS', {
            heading: utils.fixed(parseFloat(yaw, 10) + 180, 1),
            roll: parseFloat(roll, 10),
            pitch: parseFloat(pitch, 10),
            compassTime: time
        });
    }

}
