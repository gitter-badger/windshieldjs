var Promise = require('bluebird'),
    requestAsset = require('./requestAsset'),
    parseAssetData = require('./parseAssetData'),
    addReferencedAssetsData = require('./addReferencedAssetsData'),
    addNonStockImageUrls = require('./addNonStockImageUrls');

module.exports = function (assetRef, depth) {
    return requestAsset(assetRef)
        .then(parseAssetData)
        .then(addReferencedAssetsData(depth))
        .then(addNonStockImageUrls);
};
