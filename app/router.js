var path = require('path'),
    request = require('request-promise'),
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
            var lookuppage = req.query.lookuppage;
            owcs.promises.authenticate().then(function (ticket) {
                if (ticket != null) {
                    var requestUrl = config.owcs.host + '/cs/REST/sites/www-cars-com/types/Page/search';
                    request({
                        headers: {
                            'accept': 'application/json;charset=utf-8',
                            'pragma': 'auth-redirect=false'
                        },
                        method: 'GET',
                        url: requestUrl,
                        qs: {
                            multiticket: ticket,
                            'field:Webreference:wildcard': '*' + lookuppage + '*'
                        },
                        transform: function (body) {
                            try {
                                return JSON.parse(body);
                            } catch (e) {
                                reject(e);
                            }
                        }
                    }).then(function (data) {
                        owcs.promises.getAssetDao(data.assetinfo[0].id, 4)
                            .then(controller.layout.oneColumn.render(reply))
                            .catch(function (error) {
                                logger.error(error);
                            });
                    }).catch(logger.error);
                }
            }).catch(logger.error);
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
