const _ = require('lodash');

export const getDirectionalDiff = (angle1: number, angle2: number) => {
        var diff = angle2 - angle1;
        if (diff < -180) diff += 360;
        if (diff > 180) diff -= 360;
        return diff;
    }

export const now =  () => new Date().getTime()

