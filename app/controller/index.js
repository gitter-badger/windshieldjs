var Promise = require('bluebird'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    config = require('../../config.json'),
    owcs = require(path.join(config.approot, 'lib', 'owcs'))(config.owcs);

/**
 * TODO: this is for PoC only ... break this thing up!
 */

module.exports = {
    renderPage: function (reply, view) {

        return function (assetDao) {

            var parsed = {};

            parsed.title = assetDao.attr('title');
            parsed.slots = [];

            Promise.all(_.map(assetDao.getAssociatedAssets('assets'), function (assetRef) {
                var assocDao = owcs.functions.createAssetDao(assetDao.getAssetData(assetRef)),
                    asset = {},
                    recs = [];

                asset.name = assocDao.prop('name');
                asset.subtype = assocDao.prop('subtype');

                switch (asset.subtype) {
                    case 'CuratedArticles':
                        asset.items = _.map(assetDao.getManualrecs(assetRef), function (item) {
                            var r = {},
                                carouselMedia = item.associatedAssets.carouselMedia ? item.associatedAssets.carouselMedia[0] : false,
                                mainMedia = item.associatedAssets.mainMedia ? item.associatedAssets.mainMedia[0] : false;
                            r.image = assetDao.getNonStockImageUrl(carouselMedia ? carouselMedia : mainMedia);
                            r.name = item.name;
                            r.href = item.attributes.Webreference[0].url;
                            return r;
                        });
                        break;
                    case 'Ad':
                        asset.adSlot = assocDao.attr('adSlot');
                        asset.adSize = assocDao.attr('adSize');
                        break;
                    case 'CuratedTag':
                        // TODO: add more data
                        asset.title = assocDao.attr('title');
                        break;
                    case 'Article':
                        asset.headline = assocDao.attr('headline');
                        // TODO: parse, request and add embedded assets in body
                        asset.body = assocDao.attr('body');
                        asset.href = assocDao.attr('Webreference')[0].url;
                        break;
                }

                parsed.slots.push(asset);

                return Promise.promisify(fs.readFile)(path.join(config.approot, 'app', 'view', 'templates', 'partials', assocDao.prop('subtype'), 'default.html'), 'utf-8').then(function (source) {
                    return new Promise(function (resolve, reject) {
                        resolve({
                            name: assocDao.prop('subtype'),
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
