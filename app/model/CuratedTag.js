var _ = require('lodash');

module.exports = function (assetDao, rootDao) {
    this.name = assetDao.prop('name');
    this.subtype = assetDao.prop('subtype');
    this.title = assetDao.attr('title');
};
