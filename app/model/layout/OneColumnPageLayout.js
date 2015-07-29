var Promise = require('bluebird'),
    _ = require('lodash'),
    path = require('path'),
    config = require('../../../config.json'),
    owcs = require(path.join(config.approot, 'lib', 'owcs')),
    logger = require('../../logger'),
    generatePartialName = require('../../util/generatePartialName');

module.exports = function (assetDao) {
    var _this = this;
    this.title = assetDao.attr('title');
    this.assoc = [];
    _.forEach(assetDao.getAssociatedAssets('assets'), function (assetRef) {
        var assocDao = new owcs.dao.AssetDao(assetDao.getAssetData(assetRef)),
            asset,
            AssocModel;
        try {
            AssocModel = require('../subtype/' + assocDao.prop('subtype'));
            asset = new AssocModel(assocDao, assetDao);
            asset.partial = generatePartialName(asset.subtype, asset.id);
        } catch (e) {
            asset = { subtype: 'NotFound' };
        }
        _this.assoc.push(asset);
    });
};
