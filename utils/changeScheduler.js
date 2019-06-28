const {sendMessage} = require('../network/networkBus/network-bus');
const _ = require('lodash');


module.exports.changeScheduler = (event, delay = 10) => {
    let values = {};

    const scheduleSendValues = _.debounce(() => {
        sendMessage(event, values);
        values = {};
    }, delay);

    return (name, value) => {
        value === undefined ? value = null : value;
        values[name] = value;
        scheduleSendValues();
    }
};


module.exports.observableChangeScheduler = (observable, event, delay = 50, excludes = []) => {
    const changeScheduler = module.exports.changeScheduler(event, delay);

    observable.observe(change =>
        excludes.includes(change.name) || changeScheduler(change.name, change.newValue === undefined ? null : change.newValue)
    );
};
