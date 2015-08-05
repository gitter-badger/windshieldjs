var Promise = require('bluebird'),
    _ = require('lodash'),
    path = require('path'),
    config = require(global.configPath),
    owcsRest = require(path.join(config.appRoot, 'lib', 'owcs-rest')),
    generatePartialName = require('./generatePartialName');

module.exports = function (webref) {
    return new Promise(function (resolve, reject) {
        owcsRest.promises.getAssetRefFromWebreference(webref)
            .then(_.partialRight(owcsRest.promises.getAssetDao, 4))
            .then(function (assetDao) {
                var data = {};
                data.title = assetDao.attr('title');
                data.componentName = assetDao.prop('subtype');
                data.assoc = _.map(assetDao.getAssociatedAssets('assets'), function (assetRef) {
                    var asset = assetDao.getAssetData(assetRef);
                    asset.partial = generatePartialName(asset.subtype, asset.id);
                    asset.componentName = asset.subtype;
                    asset.recs = assetDao.getManualrecs(asset.id);
                    asset.nonStockImageUrls = assetDao.get().nonStockImageUrls;
                    return asset;
                });
                data.layout = _.findWhere(assetDao.attr('Webreference'), { url: webref }).template.split('/').pop();
                resolve(data);
            })
            .catch(reject);
    });
};
