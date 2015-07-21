var data = require('./data');

module.exports = function (host) {
    data.config.host = host;
    return {
        promises: require('./promises'),
        functions: require('./functions')
    };
};
