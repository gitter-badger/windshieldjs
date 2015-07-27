var _ = require('lodash');

module.exports = function (assetDao, rootDao) {
    var asset = {};
    asset.name = assetDao.prop('name');
    asset.subtype = assetDao.prop('subtype');
    asset.headline = assetDao.attr('headline');

    // TODO: parse, request and add embedded assets in body
    asset.body = assetDao.attr('body');

    // TODO: add href - this doesn't work
    //asset.href = assetDao.attr('Webreference')[0].url;
    return asset;
};
