const BASE_DIR = '/opt/boat-systems';



module.exports = {
    apps : [{
        name        : "network-bridge",
        script      : "yarn start",
        watch       : true,
        cwd         : `${BASE_DIR}/network/networkBridge`,
    }, {
        name        : "http-bridge",
        script      : "yarn start",
        watch       : true,
        cwd         : `${BASE_DIR}/network/httpBridge`,
    }, {
        name        : "compass",
        script      : "yarn start",
        watch       : true,
        cwd         : `${BASE_DIR}/hardware/compass`,
    }, {
        name        : "rudder",
        script      : "yarn start",
        watch       : true,
        cwd         : `${BASE_DIR}/hardware/rudderInterface`,
    }, {
        name        : "client",
        script      : "yarn start",
        watch       : true,
        cwd         : `${BASE_DIR}/client`,
    }, {
        name        : "autopilot",
        script      : "yarn start",
        watch       : true,
        cwd         : `${BASE_DIR}/autopilot`,
    }]
}