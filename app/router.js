var path = require('path'),
    owcsAdapter = require('./adapters/owcs'),
    render = require('./render'),
    logger = require('./utils/logger'),
    config = require(global.appConfigPath),
    owcsRest = require('owcs-rest');

module.exports = function (server) {

    server.route({
        method: 'GET',
        path: '/news',
        handler: function (req, reply) {
            owcsAdapter.getPageDef('news')
                .then(render(reply))
                .catch(logger.error);
        }
    });










    /**
     * Don't use the below routes. They are just for debugging.
     */

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

};
