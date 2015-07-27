var _ = require('lodash');

module.exports = function (assetDao, rootDao) {
    var asset = {};

    asset.name = assetDao.prop('name');
    asset.subtype = assetDao.prop('subtype');

    asset.items = _.map(rootDao.getManualrecs(assetDao.prop('id')), function (item) {
        var r = {},
            carouselMedia = item.associatedAssets.carouselMedia ? item.associatedAssets.carouselMedia[0] : false,
            mainMedia = item.associatedAssets.mainMedia ? item.associatedAssets.mainMedia[0] : false;
        r.image = rootDao.getNonStockImageUrl(carouselMedia ? carouselMedia : mainMedia);
        r.name = item.name;
        r.href = item.attributes.Webreference[0].url;
        return r;
    });

    return asset;
};
