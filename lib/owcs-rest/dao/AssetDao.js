var _ = require('lodash');

function AssetDao(data) {
    this.__data = data;
}

AssetDao.prototype.get = function () {
    return this.__data;
};

AssetDao.prototype.getAssociatedAssets = function (associationName) {
    return (associationName != null) ? this.get().associatedAssets[associationName] : this.get().associatedAssets;
};

AssetDao.prototype.getAssetData = function (assetRef) {
    return (assetRef != null) ? _.findWhere(this.get().assetData, { id: assetRef }) : this.get().assetData;
};

AssetDao.prototype.getProperty = AssetDao.prototype.prop = function (propertyName) {
    return this.get()[propertyName];
};

AssetDao.prototype.getAttribute = AssetDao.prototype.attr = function (attributeName) {
    return this.get().attributes[attributeName];
};

AssetDao.prototype.getManualrecs = function (assetRef) {
    if (assetRef == null) throw new Error('assetRef is required');
    return _.map(
                _.flow(
                    _.property('attributes.Manualrecs'),
                    _.partialRight(_.sortBy, 'confidence'),
                    _.partialRight(_.map, 'assetid'))(this.getAssetData(assetRef)),
            this.getAssetData.bind(this)).reverse();
};

module.exports = AssetDao;
