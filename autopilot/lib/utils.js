"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _ = require('lodash');
exports.getDirectionalDiff = (angle1, angle2) => {
    var diff = angle2 - angle1;
    if (diff < -180)
        diff += 360;
    if (diff > 180)
        diff -= 360;
    return diff;
};
exports.now = () => new Date().getTime();
//# sourceMappingURL=utils.js.map