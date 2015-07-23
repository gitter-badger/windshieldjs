var Promise = require('bluebird'),
    _ = require('lodash'),
    requestAsset = require('./requestAsset'),
    parseAssetRef = require('../functions/parseAssetRef');

module.exports = function (assetRefs) {
    return Promise.all(_.map(assetRefs, function (assetref) {
        return requestAsset(assetref);
    }));
};
