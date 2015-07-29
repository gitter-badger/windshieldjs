var Promise = require('bluebird'),
    requestAsset = require('./requestAsset'),
    parseAssetData = require('./parseAssetData'),
    addReferencedAssetsData = require('./addReferencedAssetsData'),
    plugins = require('../plugins');

module.exports = function (assetRef, depth) {
    var chain, k;

    chain = requestAsset(assetRef)
        .then(parseAssetData)
        .then(addReferencedAssetsData(depth));

    if (plugins.decorators.assetData) {
        plugins.decorators.assetData.forEach(function (v) {
            chain = chain.then(v);
        });
    }

    return chain;
};
