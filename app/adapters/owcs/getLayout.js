var Promise = require('bluebird'),
    _ = require('lodash'),
    path = require('path'),
    config = require(global.appConfigPath),
    owcsRest = require('owcs-rest'),
    generatePartialName = require('./generatePartialName');

module.exports = function (req) {
    return new Promise(function (resolve, reject) {
        var webref;

        if (!req.query.lookuppage) {
            reject('lookuppage query parameter required');
        } else {
            webref = req.query.lookuppage;
        }

        owcsRest.promises.getAssetRefFromWebreference(webref)
            .then(_.partialRight(owcsRest.promises.getAssetDao, 4))
            .then(function (assetDao) {
                var data = {
                    attributes: {},
                    collections: {}
                };
                data.component = _.findWhere(assetDao.attr('Webreference'), { url: webref }).template.split('/').pop();
                data.title = assetDao.attr('title');
                data.collections.main = _.map(assetDao.getAssociatedAssets('assets'), function (assetRef) {
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
