var composer = require('../adapters/composer'),
    renderer = require('../renderer'),
    logger = require('../utils/logger'),
    routes = require('../routes'),
    config = require(global.appConfigPath);

module.exports = function (server) {

    routes.forEach(function (route) {
        if (!route.path) throw new Error('missing `path` property');
        if (!route.context) throw new Error('missing `context` property');
        if (!route.adapters) throw new Error('missing `adapters` property');

        server.route({
            method: route.method || 'GET',
            path: config.server.context + route.path,
            handler: function (request, reply) {
                var composerArgs = [];

                route.context.request = request;

                composerArgs.push(route.context);

                route.adapters.forEach(function (adapter) {
                    composerArgs.push(adapter);
                });

                composer.apply(this, composerArgs)
                    .then(renderer(reply))
                    .catch(logger.error);
            }
        });
    });

};








































// keeping these commented out for easy reference ... can be used for debugging

/*
var owcsRest = require('owcs-rest');

// parsed asset data
server.route({
    method: 'GET',
    path: '/asset/{type}/{id}',
    handler: function (req, reply) {
        var type = req.params.type,
            id = req.params.id;

        owcsRest.promises.getAssetDao(owcsRest.functions.constructAssetRef(type, id), 4)
            .then(function (dao) {
                reply(dao.get());
            })
            .catch(logger.error);
    }
});

// raw asset data
server.route({
    method: 'GET',
    path: '/raw/{type}/{id}',
    handler: function (req, reply) {
        var type = req.params.type,
            id = req.params.id;

        owcsRest.promises.requestAsset(owcsRest.functions.constructAssetRef(type, id))
            .then(reply)
            .catch(logger.error);

    }
});

*/
