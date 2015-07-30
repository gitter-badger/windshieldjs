var _ = require('lodash'),
    daoExtensions = require('./dao-extensions'),
    hooks = require('./hooks'),
    assetTypeBlacklist = require('./assetTypeBlacklist'),
    config = require('./config.json');

module.exports = function (options) {
    _.assign(config, options);
    return {
        daoExtensions: daoExtensions,
        hooks: hooks,
        assetTypeBlacklist: assetTypeBlacklist
    };
};
