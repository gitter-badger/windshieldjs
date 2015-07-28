var _ = require('lodash');

module.exports = function (assetDao, assetRef) {
    this.name = assetDao.prop('name');
    this.subtype = assetDao.prop('subtype');
    this.adSlot = assetDao.attr('adSlot');
    this.adSize = assetDao.attr('adSize');
};
