var path = require('path'),
    request = require('request-promise'),
    _ = require('lodash'),
    config = require('../../config.json'),
    owcs = require('./lib/owcs')(config.owcs.host);

module.exports = function (server) {

    // example of rendering the news page - minus the global nav for now
    server.route({
        method: 'GET',
        path: '/',
        handler: function (req, reply) {
            owcs.promises.getAssetWithAssociated({ type: 'Page', id: '1415909398642' }).then(function (data) {
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

                reply.view('news', parsed);

            }).catch(console.log);
        }
    });

    // asset API Example
    server.route({
        method: 'GET',
        path: '/asset/{type}/{id}',
        handler: function (req, reply) {
            var type = req.params.type,
                id = req.params.id;

            owcs.promises.getAssetWithAssociated({ type: type, id: id }).then(function (data) {
                reply(data);
            }).catch(console.log);

        }
    });

    // Static server - could just as easily do this via nginx
    server.route({
        method: 'GET',
        path: '/static/{param*}',
        handler: {
            directory: {
                path: path.join(config.approot, '..', 'www-cars-com-static', 'dist')
            }
        }
    });

};
