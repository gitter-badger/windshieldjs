var Promise = require('bluebird'),
    _ = require('lodash'),
    path = require('path'),
    config = require(global.configPath),
    owcsRest = require(path.join(config.appRoot, 'lib', 'owcs-rest')),
    getDataFromWebref = require('./getDataFromWebref');

module.exports = {
    getDataFromWebref: getDataFromWebref
};

