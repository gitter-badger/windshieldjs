var Promise = require('bluebird'),
    _ = require('lodash'),
    getAssetWithAssociated = require('./getAssetWithAssociated');

function AssetDao(data) {
    this.__data = data;
}

AssetDao.prototype.get = function (assetref) {
    return this.__data;
};

AssetDao.prototype.getAssociatedAssets = function (associationName) {
    return (associationName != null) ? this.get().associatedAssets[associationName] : this.get().associatedAssets;
};

AssetDao.prototype.getAssetData = function (assetRef) {
    return (assetRef != null) ? _.findWhere(this.get().assetData, { id: assetRef }) : this.get().assetData;
};

AssetDao.prototype.getAttribute = function (attributeName) {
    return this.get().attributes[attributeName];
};

AssetDao.prototype.getManualrecs = function (assetRef) {
    if (assetRef == null) throw new Error('assetRef is required');
    return _.map(
                _.flow(
                    _.property('attributes.Manualrecs'),
                    _.partialRight(_.map, 'assetid'))(this.getAssetData(assetRef)),
            this.getAssetData.bind(this));
};

AssetDao.prototype.getNonStockImageUrl = function (assetRef) {
    if (assetRef == null) throw new Error('assetRef is required');
    return this.get().nonStockImageUrls[assetRef];
};

module.exports = function (assetRef) {
    return new Promise(function (resolve, reject) {
        getAssetWithAssociated(assetRef).then(function (data) {
            resolve(new AssetDao(data));
        });
    });
};
