var Promise = require('bluebird'),
    _ = require('lodash'),
    path = require('path'),
    config = require(global.appConfigPath),
    owcsRest = require('owcs-rest'),
    generatePartialName = require('./generatePartialName');

module.exports = function (webref) {
    return new Promise(function (resolve, reject) {
        owcsRest.promises.getAssetRefFromWebreference(webref)
            .then(_.partialRight(owcsRest.promises.getAssetDao, 4))
            .then(function (assetDao) {
                var data = {
                    attributes: {},
                    associations: {}
                };
                data.layout = _.findWhere(assetDao.attr('Webreference'), { url: webref }).template.split('/').pop();
                data.title = assetDao.attr('title');
                data.associations.main = _.map(assetDao.getAssociatedAssets('assets'), function (assetRef) {
                    var asset = assetDao.getAssetData(assetRef);
                    asset.component = asset.subtype;
                    asset.partial = generatePartialName(asset.subtype, asset.id);
                    asset.recs = assetDao.getManualrecs(asset.id);
                    asset.nonStockImageUrls = assetDao.get().nonStockImageUrls;
                    return asset;
                });
                resolve(data);
            })
            .catch(reject);
    });
};
