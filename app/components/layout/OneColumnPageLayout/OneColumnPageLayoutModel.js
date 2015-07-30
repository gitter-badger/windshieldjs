var Promise = require('bluebird'),
    _ = require('lodash'),
    path = require('path'),
    config = require('../../../../config.json'),
    owcsRest = require(path.join(config.appRoot, 'lib', 'owcs-rest')),
    logger = require('../../../logger'),
    utils = require('../../../utils'),
    maps = require('../../../resources/maps.json');

module.exports = function (assetDao) {
    var _this = this;
    this.title = assetDao.attr('title');
    this.assoc = [];
    _.forEach(assetDao.getAssociatedAssets('assets'), function (assetRef) {
        var assocDao = new owcsRest.dao.AssetDao(assetDao.getAssetData(assetRef)),
            asset,
            AssocModel;
        try {
            AssocModel = require(path.join('..', '..', maps.paths[assocDao.prop('subtype')], assocDao.prop('subtype') + 'Model'));
            asset = new AssocModel(assocDao, assetDao);
            asset.partial = utils.generatePartialNameFromAssetRef(asset.subtype, asset.id);
        } catch (e) {
            asset = { subtype: 'NotFound' };
        }
        _this.assoc.push(asset);
    });
};
