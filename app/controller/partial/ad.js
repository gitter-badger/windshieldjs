var _ = require('lodash');

module.exports = function (assetDao, assetRef) {
    var asset = {};
    asset.name = assetDao.prop('name');
    asset.subtype = assetDao.prop('subtype');
    asset.adSlot = assetDao.attr('adSlot');
    asset.adSize = assetDao.attr('adSize');
    return asset;
};
