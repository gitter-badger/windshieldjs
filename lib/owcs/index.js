var config = require('./resources/config');

module.exports = function (options) {
    config.host = options.host;
    return {
        promises: require('./promises'),
        functions: require('./functions')
    };
};
