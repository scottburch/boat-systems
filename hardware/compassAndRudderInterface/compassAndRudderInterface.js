const utils = require('./utils');
const Smoother = require('./Smoother');
const {sendError, sendInfo} = require('../../network/logSender');
const {sendMessage, onBusMessage} = require('../../network/networkBus');


//process.on('uncaughtException', err => sendError(`${process.argv[1]}: ${err.toString()}`));
//process.on('unhandledRejection', (err) => sendError(`${process.argv[1]}: ${err.toString()}`));


const _ = require('lodash');

let port;
const SerialPort = require('serialport');

start();

function start() {
//    const dev = '/dev/tty.usbserial-A4007c47';
//    var dev = '/dev/cu.usbmodem1421'
//    var dev = '/dev/ttyACM0';
    var dev = '/dev/ttyUSB0';
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
                var parts = string.split(':');
                var prefix = parts[0];
                var data = parts[1];
                switch (prefix) {
                    case 'AHRS':
                        compass(data);
                        pong(data);
                        break;
                    case 'D':
                        try {
                            sendMessage('COMPASS_DELAY', {delay: parseInt(data)});
                        } catch (e) {
                        }
                        break;
                    case 'HZ':
                        sendMessage('AHRS', {hz: data});
                        break;
                    case 'B' :
                        sendMessage('AHRS', {prevBase: data});
                        break;
                    case 'T':
                        sendMessage('AHRS', {prevTach: data});
                        break;
                    case 'S':
                        sendMessage('AHRS', {prevSpeed: data});
                        break;
                    case 'V':
                        const [volts, minVolts, maxVolts] = data.split(',');
                        sendMessage('AHRS', {volts, minVolts, maxVolts});
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
    });


    const headingSmoother = new Smoother(10);

    const pong = data => {
        const [roll, pitch, yaw, time] = data.split(',');
        port.write(`P:${time}!`);
    };

    function compass(data) {
        const [roll, pitch, yaw] = data.split(',');
        const heading = parseFloat(yaw, 10) + 180;
        sendMessage('AHRS', {
            rawHeading: heading,
            heading: utils.fixed(headingSmoother.smooth(heading), 0),
            roll: parseFloat(roll, 10),
            pitch: parseFloat(pitch, 10)
        })
    }

}
