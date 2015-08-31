var Promise = require('bluebird'),
    getAssetData = require('./getAssetData'),
    AssetDao = require('../dao/AssetDao');

module.exports = function (assetRef, depth) {
    return new Promise(function (resolve, reject) {
        getAssetData(assetRef, depth).then(function (assetData) {
            resolve(new AssetDao(assetData));
        }).catch(reject);
    });
};
