const nullToUndefined =  obj => _.reduce(obj, (result, v, k) => {
    _.isPlainObject(v) ? (
        result[k] = module.exports.nullToUndefined(v)
    ) : (
        result[k] = v === null ? undefined : v
    ) ;
    return result;
}, {});

module.exports.objToMsg = obj => `$${JSON.stringify(obj, (k, v) => v === undefined ? null : v)}\n`;

module.exports.msgToObj = msg => nullToUndefined(JSON.parse(msg.toString().replace(/^\$/, '')));

