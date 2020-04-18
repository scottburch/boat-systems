"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
var spi = require('spi-device');
var Gpio = require('onoff').Gpio;
var times = require('lodash').times;
var pressAnyKey = require('press-any-key');
var ADS_RDY_PIN = new Gpio(17, 'in', 'both');
var ADS_RST_PIN = new Gpio(18, 'out');
var ADS_CS_PIN = new Gpio(22, 'out');
var DA_CS_PIN = new Gpio(23, 'out');
var CAL_PIN = new Gpio(4, 'out');
var hardReset = function () { return __awaiter(void 0, void 0, void 0, function () {
    var start;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('Resetting ADC...');
                start = Date.now();
                ADS_RST_PIN.writeSync(0);
                return [4 /*yield*/, delay()];
            case 1:
                _a.sent();
                ADS_RST_PIN.writeSync(1);
                exports.waitForDataReady();
                console.log('done', (Date.now() - start) / 1000 + "sec");
                return [2 /*return*/];
        }
    });
}); };
exports.initADS = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("Initializing ADS");
                return [4 /*yield*/, hardReset()];
            case 1:
                _a.sent();
                return [4 /*yield*/, delay(150)];
            case 2:
                _a.sent();
                DA_CS_PIN.writeSync(1);
                ADS_CS_PIN.writeSync(0);
                exports.setRegister(Registers.AD_DATA_RATE, 0x23); // lower sample rate
                //    await systemCalibration();
                autoCalibrate();
                return [2 /*return*/];
        }
    });
}); };
var systemCalibration = function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('System calibration');
                console.log('Applying max voltage');
                CAL_PIN.writeSync(0); // apply 3 volts to AD0 input
                return [4 /*yield*/, delay(500)];
            case 1:
                _a.sent();
                exports.spiSend([{ bytes: [Commands.SYSGCAL] }]);
                exports.waitForDataReady();
                console.log('Applying min voltage');
                CAL_PIN.writeSync(1);
                return [4 /*yield*/, delay(500)];
            case 2:
                _a.sent();
                exports.spiSend([{ bytes: [Commands.SYSOCAL] }]);
                exports.waitForDataReady();
                return [2 /*return*/];
        }
    });
}); };
var autoCalibrate = function () {
    console.log('Starting calibration...');
    var start = Date.now();
    exports.spiSend([{
            bytes: [Commands.SELFCAL]
        }]);
    exports.waitForDataReady();
    console.log('Calibration complete:', (Date.now() - start) / 1000 + "sec");
};
exports.waitForDataReady = function () {
    while (ADS_RDY_PIN.readSync()) {
    }
};
var delay = function (ms) {
    if (ms === void 0) { ms = 1; }
    return new Promise(function (resolve) { return setTimeout(resolve, ms); });
};
exports.spiSend = function (parts) {
    exports.waitForDataReady();
    var message = parts.map(function (_a) {
        var bytes = _a.bytes, _b = _a.delay, delay = _b === void 0 ? 0 : _b;
        return ({
            sendBuffer: Buffer.from(bytes),
            receiveBuffer: Buffer.alloc(bytes.length),
            byteLength: bytes.length,
            speedHz: 20000,
            microSecondDelay: delay
        });
    });
    getSpi().transferSync(message);
    var length = message.reduce(function (size, _a) {
        var receiveBuffer = _a.receiveBuffer;
        return size + receiveBuffer.byteLength;
    }, 0);
    return Buffer.concat(message.map(function (_a) {
        var receiveBuffer = _a.receiveBuffer;
        return receiveBuffer;
    }), length);
};
var getSpi = function () { return spi.openSync(0, 0, { mode: spi.MODE1 }); };
var Commands;
(function (Commands) {
    Commands[Commands["READ_DATA"] = 1] = "READ_DATA";
    Commands[Commands["READ_REGISTER"] = 16] = "READ_REGISTER";
    Commands[Commands["WRITE_REGISTER"] = 80] = "WRITE_REGISTER";
    Commands[Commands["SYNC"] = 252] = "SYNC";
    Commands[Commands["WAKEUP"] = 0] = "WAKEUP";
    Commands[Commands["SHIFT_BYTE"] = 0] = "SHIFT_BYTE";
    Commands[Commands["SELFCAL"] = 240] = "SELFCAL";
    Commands[Commands["SYSOCAL"] = 243] = "SYSOCAL";
    Commands[Commands["SYSGCAL"] = 244] = "SYSGCAL";
    Commands[Commands["STANDBY"] = 253] = "STANDBY";
})(Commands = exports.Commands || (exports.Commands = {}));
var Registers;
(function (Registers) {
    Registers[Registers["STATUS"] = 0] = "STATUS";
    Registers[Registers["MUX"] = 1] = "MUX";
    Registers[Registers["AD_CONTROL"] = 2] = "AD_CONTROL";
    Registers[Registers["AD_DATA_RATE"] = 3] = "AD_DATA_RATE";
    Registers[Registers["GPIO_CONTROL"] = 4] = "GPIO_CONTROL";
})(Registers = exports.Registers || (exports.Registers = {}));
exports.setRegister = function (register, value) {
    return exports.spiSend([{
            bytes: [Commands.WRITE_REGISTER | register, 0],
            delay: 10
        }, {
            bytes: [value]
        }]);
};
exports.readRegister = function (register) {
    exports.spiSend([{
            bytes: [Commands.READ_REGISTER | register, 0],
            delay: 10
        }]);
    return exports.spiSend([{
            bytes: [0]
        }]);
};
exports.readData = function (bytes) {
    var request = [{
            bytes: [Commands.SYNC]
        }, {
            bytes: [Commands.WAKEUP]
        }, {
            bytes: [Commands.READ_DATA]
        }];
    times(bytes, function () { return request.push({ bytes: [Commands.SHIFT_BYTE] }); });
    return exports.spiSend(request).slice(3);
};
