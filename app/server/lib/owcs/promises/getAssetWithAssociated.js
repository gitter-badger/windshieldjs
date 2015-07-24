var Promise = require('bluebird'),
    requestAsset = require('./requestAsset'),
    parseAssetData = require('./parseAssetData'),
    addAssociatedAssetsDataToParsed = require('./addAssociatedAssetsDataToParsed'),
    addManualrecsDataToParsed = require('./addManualrecsDataToParsed'),
    addNonStockImageAssetsDataToParsed = require('./addNonStockImageAssetsDataToParsed');

module.exports = function (assetRef) {
    return requestAsset(assetRef)
        .then(parseAssetData)
        .then(addAssociatedAssetsDataToParsed)
        .then(addManualrecsDataToParsed)
        .then(addNonStockImageAssetsDataToParsed);
};
