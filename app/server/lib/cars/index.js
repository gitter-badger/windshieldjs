var _ = require('lodash');

module.exports = {
    renderPage: function (reply, view) {
        return function (data) {
            var parsed = {};

            parsed.name = data.name;

            parsed.slots = _.map(data.associatedAssetsData, function (item) {
                var slot = {};
                slot.name = item.name;
                slot.subtype = item.subtype;
                switch (item.subtype) {
                    case 'CuratedArticles':
                        slot.isCuratedArticles = true;
                        slot.items = _.map(item.attributes.ManualrecsData, function (item) {
                            var r = {};
                            r.name = item.name;
                            r.href = item.attributes.Webreference[0].url;
                            return r;
                        });
                        break;
                    case 'Ad':
                        slot.isAd = true;
                        slot.adSlot = item.attributes.adSlot;
                        slot.adSize = item.attributes.adSize;
                        break;
                    case 'LatestPublishedArticles':
                        slot.isLatestPublishedArticles = true;
                        break;
                    case 'CuratedTag':
                        slot.isCuratedTag = true;
                        slot.title = item.attributes.title;
                        break;
                    case 'Article':
                        slot.isArticle = true;
                        slot.headline = item.attributes.headline;
                        slot.body = item.attributes.body;
                        slot.href = item.attributes.Webreference[0].url;
                        break;
                }
                return slot;
            });

            reply.view(view, parsed);

        };
    }
};
