const {sendError, sendInfo} = require('../network/logSender');
const {sendMessage, onBusMessage} = require('../network/networkBus');


let port;
const SerialPort = require('serialport');



start();

function start() {
//    const dev = '/dev/tty.usbserial-A4007c47';
//    var dev = '/dev/cu.usbmodem1421'
//    var dev = '/dev/ttyACM0';
    var dev = '/dev/cu.usbserial-A5003vQ2';
//    var dev = '/dev/ttyUSB0';
    const parser = new SerialPort.parsers.Readline();
    port = new SerialPort(dev, {
        baudRate: 38400,
    });
    port.pipe(parser);


    port.on('error', (err) => {
        sendError(`${process.argv[1]}: ${err.toString()}`);
        setTimeout(start, 5000);
    });


    port.on("open", function () {
        console.log('port open');

        parser.on('data', function (string) {
            sendMessage('NEMA', {sentence: string});
        });
    });
}
