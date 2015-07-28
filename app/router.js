var path = require('path'),
    _ = require('lodash'),
    config = require('../config.json'),
    owcs = require(path.join(config.approot, 'lib', 'owcs'))(config.owcs),
    controller = require('./controller'),
    logger = require('./logger');

module.exports = function (server) {

    server.route({
        method: 'GET',
        path: '/cs/Sites',
        handler: function (req, reply) {
            owcs.promises.getAssetRefFromWebreference(req.query.lookuppage)
                .then(_.partialRight(owcs.promises.getAssetDao, 4))
                .then(controller.layout.render(reply, req.query.lookuppage))
                .catch(logger.error);
        }
    });

    // example of rendering the news page - minus the global nav for now
    server.route({
        method: 'GET',
        path: '/news',
        handler: function (req, reply) {

            // TODO: figure out why the hell hapi route handlers are all getting called twice
            //logger.info('why is this handler getting called twice??');
            //reply('');

            owcs.promises.getAssetDao('Page:1415909398642', 4)
                .then(controller.layout.oneColumn.render(reply))
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

            owcs.promises.getAssetDao(owcs.functions.constructAssetRef(type, id), 4)
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

            owcs.promises.requestAsset(owcs.functions.constructAssetRef(type, id))
                .then(reply)
                .catch(logger.error);

        }
    });

    // navigation data
    server.route({
        method: 'GET',
        path: '/nav',
        handler: function (req, reply) {
            owcs.promises.requestNavigation().then(function (data) {
                reply(data);
            }).catch(logger.error);

        }
    });

    // static server - could just as easily do this via nginx
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
