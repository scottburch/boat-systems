"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.msgToObj = exports.objToMsg = void 0;
const lodash_1 = require("lodash");
const nullToUndefined = (obj) => (0, lodash_1.reduce)(obj, (result, v, k) => {
    (0, lodash_1.isPlainObject)(v) ? (result[k] = nullToUndefined(v)) : (result[k] = v === null ? undefined : v);
    return result;
}, {});
const objToMsg = (obj) => `$${JSON.stringify(obj, (k, v) => v === undefined ? null : v)}\n`;
exports.objToMsg = objToMsg;
const msgToObj = (msg) => nullToUndefined(JSON.parse(msg.toString().replace(/^\$/, '')));
exports.msgToObj = msgToObj;
//# sourceMappingURL=utils.js.map