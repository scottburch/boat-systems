module.exports = {
    "motor-light": {
        text: 'Motor - light conditions',
        values: {
            rudderTime: 200,
            rudderWait: 200,
            kP: .5,
            kI: 0.04,
            kD: 0.02,
            rudderMult: 100
        }
    },
    'sail-light': {
        text: 'Sailing - light conditions',
        values: {
            rudderTime: 200,
            rudderWait: 200,
            kP: 0.6,
            kI: 0.06,
            kD: 0.02,
            rudderMult: 65
        }
    },
    'sail-light-med-downhill': {
        text: 'Sailing - light/med downhill',
        values: {
            rudderTime: 200,
            rudderWait: 200,
            kP: 1,
            kI: 0.04,
            kD: 0.02,
            rudderMult: 100
        }
    },
    'sail-med-heavy-downhill': {
        text: 'Sailing - med/heavy downhill',
        values: {
            rudderTime: 200,
            rudderWait: 400,
            rudderMult: 100,
            kP: 3,
            kI: .04,
            kD: .03,
        }
    }
};


