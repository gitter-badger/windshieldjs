var Promise = require('bluebird'),
    getAssetData = require('./getAssetData'),
    createAssetDao = require('../functions/createAssetDao');

module.exports = function (assetRef, depth) {
    return new Promise(function (resolve, reject) {
        getAssetData(assetRef, depth).then(function (assetData) {
            resolve(createAssetDao(assetData));
        });
    });
};
