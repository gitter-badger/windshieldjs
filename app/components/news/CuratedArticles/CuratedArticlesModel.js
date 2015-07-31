var _ = require('lodash');

module.exports = function (data) {
    this.partial = data.partial;
    this.id = data.id;
    this.name = data.name;
    this.subtype = data.subtype;
    this.items = _.map(data.recs, function (item) {
        var r = {},
            carouselMedia = item.associatedAssets.carouselMedia ? item.associatedAssets.carouselMedia[0] : false,
            mainMedia = item.associatedAssets.mainMedia ? item.associatedAssets.mainMedia[0] : false;
        r.image = data.nonStockImageUrls[carouselMedia ? carouselMedia : mainMedia];
        r.name = item.name;
        r.href = item.attributes.Webreference[0].url;
        return r;
    });
};
