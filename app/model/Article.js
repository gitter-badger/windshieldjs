var _ = require('lodash');

module.exports = function (assetDao, rootDao) {
    this.id = assetDao.prop('id');
    this.name = assetDao.prop('name');
    this.subtype = assetDao.prop('subtype');
    this.headline = assetDao.attr('headline');

    // TODO: parse, request and add embedded assets in body
    this.body = assetDao.attr('body');

    // TODO: add href - this doesn't work
    //this.href = assetDao.attr('Webreference')[0].url;
};
