var _ = require('lodash');

module.exports = function (component) {
    this.component = component.name;
    this.partial = component.partial;
    this.id = component.data.id;
    this.name = component.data.name;
    this.items = _.map(component.data.recs, function (item) {
        var r = {},
            carouselMedia = item.associatedAssets.carouselMedia ? item.associatedAssets.carouselMedia[0] : false,
            mainMedia = item.associatedAssets.mainMedia ? item.associatedAssets.mainMedia[0] : false;
        r.image = component.data.nonStockImageUrls[carouselMedia ? carouselMedia : mainMedia];
        r.name = item.attributes.headline;
        r.href = item.attributes.Webreference[0].url;
        return r;
    });
};
