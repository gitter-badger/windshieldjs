module.exports = function (target, source, prop) {
    if (source[prop]) target[prop] = source[prop];
    return target;
};
