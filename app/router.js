var path = require('path'),
    _ = require('lodash'),
    config = require('../config.json'),
    owcsRest = require(path.join(config.appRoot, 'lib', 'owcs-rest')),
    components = require('./components'),
    logger = require('./logger');

module.exports = function (server) {

    server.route({
        method: 'GET',
        path: '/cs/Sites',
        handler: function (req, reply) {
            owcsRest.promises.getAssetRefFromWebreference(req.query.lookuppage)
                .then(_.partialRight(owcsRest.promises.getAssetDao, 4))
                .then(components.layout.renderCtrl(reply, req.query.lookuppage))
                .catch(logger.error);
        }
    });

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

    // static server - could just as easily do this via nginx
    server.route({
        method: 'GET',
        path: '/static/{param*}',
        handler: {
            directory: {
                path: path.join(config.appRoot, '..', 'www-cars-com-static', 'dist')
            }
        }
    });

};
