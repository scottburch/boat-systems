const utils = require('./utils');
const Smoother = require('./Smoother');
const {sendError, sendInfo} = require('../../network/logSender');
const {sendMessage, onBusMessage} = require('../../network/networkBus');
const {changeScheduler} = require('../../utils/observableChangeScheduler');

//process.on('uncaughtException', err => sendError(`${process.argv[1]}: ${err.toString()}`));
//process.on('unhandledRejection', (err) => sendError(`${process.argv[1]}: ${err.toString()}`));


const _ = require('lodash');

let port;
const SerialPort = require('serialport');

start();

const myChangeScheduler = changeScheduler('AHRS');

function start() {
//    const dev = '/dev/tty.usbserial-A4007c47';
//    var dev = '/dev/cu.usbmodem1421'
//    var dev = '/dev/ttyACM0';
//    var dev = '/dev/ttyUSB0';
    const dev = '/dev/serial/by-id/usb-FTDI_FT232R_USB_UART_A4007c47-if00-port0';
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

        onBusMessage('RUDDER', v => port.write(`R:${v.rudder}!`));
        onBusMessage('COMPASS_PONG', v => v && port.write(`P:${v.time}!`));
    });


    const headingSmoother = new Smoother(10);


    function compass(data) {
        const [roll, pitch, yaw, time] = data.split(',');
        const heading = parseFloat(yaw, 10) + 180;
        sendMessage('AHRS', {
            rawHeading: heading,
            heading: utils.fixed(headingSmoother.smooth(heading), 0),
            roll: parseFloat(roll, 10),
            pitch: parseFloat(pitch, 10),
            compassTime: time
        });
    }

}
