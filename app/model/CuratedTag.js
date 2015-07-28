var _ = require('lodash');

module.exports = function (assetDao, rootDao) {
    this.id = assetDao.prop('id');
    this.name = assetDao.prop('name');
    this.subtype = assetDao.prop('subtype');
    this.title = assetDao.attr('title');
};
