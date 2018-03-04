const _ = require('lodash');

module.exports = {
    fixed: (n, places = 1) => parseFloat(parseFloat(n, 10).toFixed(places)),

    getDirectionalDiff(angle1, angle2) {
        var diff = angle2 - angle1;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;
        return diff;
    },

    now: () => new Date().getTime(),

    nullToUndefined: obj => _.reduce(obj, (result, v, k) => {
        _.isPlainObject(v) ? (
            result[k] = module.exports.nullToUndefined(v)
            ) : (
            result[k] = v === null ? undefined : v
        ) ;
        return result;
    }, {})


};

