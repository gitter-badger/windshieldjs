var Promise = require('bluebird'),
    _ = require('lodash'),
    path = require('path'),
    config = require(global.appConfigPath),
    owcsRest = require('owcs-rest'),
    generatePartialName = require('./generatePartialName');

module.exports = function (context) {
    return new Promise(function (resolve, reject) {
        owcsRest.promises.getAssetRefFromWebreference(context.webref)
            .then(_.partialRight(owcsRest.promises.getAssetDao, 4))
            .then(function (assetDao) {
                var data = {
                    associations: {}
                };
                data.layout = _.findWhere(assetDao.attr('Webreference'), { url: context.webref }).template.split('/').pop();
                data.title = assetDao.attr('title');
                data.associations.main = _.map(assetDao.getAssociatedAssets('assets'), function (assetRef) {
                    var asset = {};
                    asset.data = assetDao.getAssetData(assetRef);
                    asset.data.recs = assetDao.getManualrecs(asset.data.id);
                    asset.data.nonStockImageUrls = assetDao.get().nonStockImageUrls;
                    asset.name = asset.data.subtype;
                    asset.partial = generatePartialName(asset.data.subtype, asset.data.id);
                    return asset;
                });
                resolve(data);
            })
            .catch(reject);
    });
};
