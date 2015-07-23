var Promise = require('bluebird'),
    _ = require('lodash'),
    getAssetWithAssociated = require('./getAssetWithAssociated');

function AssetDao(data) {
    this.data = data;
}

AssetDao.prototype.get = function (assetref) {
    return this.data;
};

AssetDao.prototype.getAssociatedAssets = function (associationName) {
    return (associationName != null) ? this.data.associatedAssets[associationName] : this.data.associatedAssets;
};

AssetDao.prototype.getAssociatedAssetsData = function (assetRef) {
    return (assetRef != null) ? _.findWhere(this.data.associatedAssetsData, { id: assetRef }) : this.data.associatedAssetsData;
};

module.exports = function (assetRef) {
    return new Promise(function (resolve, reject) {
        getAssetWithAssociated(assetRef).then(function (data) {
            resolve(new AssetDao(data));
        });
    });
};
