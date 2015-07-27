var config = require('./resources/config');

module.exports = function (host) {
    config.host = host;
    return {
        promises: require('./promises'),
        functions: require('./functions')
    };
};
