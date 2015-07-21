var request = require('request-promise'),
    _ = require('lodash'),
    Promise = require('bluebird'),
    data = require('./data');

module.exports = function (host) {
    data.config.host = host;
    return {
        promises: require('./promises'),
        functions: require('./functions')
    };
};
