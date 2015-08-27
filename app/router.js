var path = require('path'),
    composer = require('./adapters/composer'),
    render = require('./render'),
    logger = require('./utils/logger'),
    owcsRest = require('owcs-rest'),
    routingTable = require('./routingTable');

module.exports = function (server) {

    routingTable.forEach(function (route) {
        if (!route.path) throw new Error('missing `path` property');
        if (!route.context) throw new Error('missing `context` property');
        if (!route.adapters) throw new Error('missing `adapters` property');
        server.route({
            method: route.method || 'GET',
            path: route.path,
            handler: function (request, reply) {
                var composerArgs = [];

                route.context.request = request;

                composerArgs.push(route.context);

                route.adapters.forEach(function (adapter) {
                    composerArgs.push(adapter);
                });

                composer.apply(this, composerArgs)
                    .then(render(reply))
                    .catch(logger.error);
            }
        });
    });

};








































// keeping these commented out for easy reference ... can be used for debugging

/*

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
