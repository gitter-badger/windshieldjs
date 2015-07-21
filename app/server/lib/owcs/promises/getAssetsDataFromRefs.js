var Promise = require('bluebird'),
    _ = require('lodash'),
    getAsset = require('./getAsset'),
    parseAssetRef = require('../functions/parseAssetRef');

module.exports = function (assetRefs) {
    return Promise.all(_.map(assetRefs, function (assetid) {
        return getAsset(parseAssetRef(assetid));
    }));
};
