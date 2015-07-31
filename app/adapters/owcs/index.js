var Promise = require('bluebird'),
    _ = require('lodash'),
    path = require('path'),
    config = require('../../../config.json'),
    owcsRest = require(path.join(config.appRoot, 'lib', 'owcs-rest')),
    utils = require('../../utils'),
    getDataFromWebref = require('./getDataFromWebref');

module.exports = {
    getDataFromWebref: getDataFromWebref
};

