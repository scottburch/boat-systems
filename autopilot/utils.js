const _ = require('lodash');

module.exports = {

    getDirectionalDiff(angle1, angle2) {
        var diff = angle2 - angle1;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;
        return diff;
    },

    now: () => new Date().getTime(),
};

