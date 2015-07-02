var path = require('path'),
    request = require('request-promise'),
    _ = require('lodash'),
    config = require('../../config.json'),
    owcs = require('./lib/owcs');

module.exports = function (server) {

    server.route({
        method: 'GET',
        path: '/',
        handler: function (req, reply) {
            reply.view('layout');
        }
    });

    server.route({
        method: 'GET',
        path: '/asset/{type}/{id}',
        handler: function (req, reply) {
            var type = req.params.type,
                id = req.params.id,
                assetPromise = owcs.getAsset({ type: type, id: id });
            assetPromise.then(function (data) {
                var parsed = owcs.parseAssetData(data),
                    associatedAssetsPromise = owcs.getAssetsFromRefs(parsed.associatedAssets);
                associatedAssetsPromise.then(function (assetsData) {
                    parsed.associatedAssetsData = assetsData;
                    reply(parsed);
                });
                associatedAssetsPromise.catch(console.log);
            });
            assetPromise.catch(console.log);
        }
    });

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
