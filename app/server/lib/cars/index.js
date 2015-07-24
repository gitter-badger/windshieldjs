var Promise = require('bluebird'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path');


module.exports = function (config) {
    return {
        renderPage: function (reply, view) {
            return function (assetDao) {
                var parsed = {};

                parsed.title = assetDao.getAttribute('title');
                parsed.slots = [];

                Promise.all(_.map(_.flatten(_.values(assetDao.getAssociatedAssets())), function (assetRef) {
                    var assetData = assetDao.getAssetData(assetRef),
                        asset = {},
                        recs = [];

                    asset.name = assetData.name;
                    asset.subtype = assetData.subtype;

                    switch (assetData.subtype) {
                        case 'CuratedArticles':
                            asset.items = _.map(assetDao.getManualrecs(assetRef), function (asset) {
                                var r = {};
                                r.name = asset.name;
                                r.href = asset.attributes.Webreference[0].url;
                                return r;
                            });
                            break;
                        case 'Ad':
                            asset.adSlot = assetData.attributes.adSlot;
                            asset.adSize = assetData.attributes.adSize;
                            break;
                        case 'CuratedTag':
                            asset.title = assetData.attributes.title;
                            break;
                        case 'Article':
                            asset.headline = assetData.attributes.headline;
                            asset.body = assetData.attributes.body;
                            asset.href = assetData.attributes.Webreference[0].url;
                            break;
                    }

                    parsed.slots.push(asset);

                    return Promise.promisify(fs.readFile)(path.join(config.approot, 'app', 'server', 'views', 'templates', 'partials', assetData.subtype, 'default.html'), 'utf-8').then(function (source) {
                        return new Promise(function (resolve, reject) {
                            resolve({
                                name: assetData.subtype,
                                source: source
                            });
                        });
                    });

                })).then(function (partials) {
                    _.forEach(partials, function (partial) {
                        handlebars.registerPartial(partial.name, partial.source);
                    });
                    reply.view(view, parsed);
                });

            };
        }
    };
};
