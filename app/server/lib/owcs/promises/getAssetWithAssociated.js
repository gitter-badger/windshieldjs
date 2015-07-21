var Promise = require('bluebird'),
    requestAsset = require('./requestAsset'),
    parseAssetData = require('./parseAssetData'),
    addAssetsDataToParsed = require('./addAssetsDataToParsed'),
    addManualrecsDataToParsed = require('./addManualrecsDataToParsed');

module.exports = function (asset) {
    return requestAsset(asset)
        .then(parseAssetData)
        .then(addAssetsDataToParsed)
        .then(addManualrecsDataToParsed);
};
