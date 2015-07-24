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

AssetDao.prototype.getAssetData = function (assetRef) {
    return (assetRef != null) ? _.findWhere(this.data.assetData, { id: assetRef }) : this.data.assetData;
};

AssetDao.prototype.getAttribute = function (attributeName) {
    return this.data.attributes[attributeName];
};

AssetDao.prototype.getManualrecs = function (assetRef) {
    if (assetRef == null) throw new Error('assetRef is required');
    return _.map(
                _.flow(
                    _.property('attributes.Manualrecs'),
                    _.partialRight(_.map, 'assetid'))(this.getAssetData(assetRef)),
            this.getAssetData.bind(this));
};

module.exports = function (assetRef) {
    return new Promise(function (resolve, reject) {
        getAssetWithAssociated(assetRef).then(function (data) {
            resolve(new AssetDao(data));
        });
    });
};
