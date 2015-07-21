var Promise = require('bluebird'),
    getAsset = require('./getAsset'),
    parseAssetData = require('./parseAssetData'),
    addAssetsDataToParsed = require('./addAssetsDataToParsed'),
    addManualrecsDataToParsed = require('./addManualrecsDataToParsed');

module.exports = function (asset) {
    return getAsset(asset)
        .then(parseAssetData)
        .then(addAssetsDataToParsed)
        .then(addManualrecsDataToParsed);
};
