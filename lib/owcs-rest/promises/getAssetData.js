var Promise = require('bluebird'),
    requestAsset = require('./requestAsset'),
    parseAssetData = require('./parseAssetData'),
    addReferencedAssetsData = require('./addReferencedAssetsData'),
    plugins = require('../plugins');

module.exports = function (assetRef, depth) {
    var chain;

    chain = requestAsset(assetRef)
        .then(parseAssetData)
        .then(addReferencedAssetsData(depth));

    if (plugins.hooks.assetData) {
        plugins.hooks.assetData.forEach(function (hook) {
            chain = chain.then(hook);
        });
    }

    return chain;
};
