var _ = require('lodash');

module.exports = function (assetDao, rootDao) {
    var asset = {};
    asset.name = assetDao.prop('name');
    asset.subtype = assetDao.prop('subtype');
    asset.title = assetDao.attr('title');
    return asset;
};
