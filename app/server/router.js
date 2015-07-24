var path = require('path'),
    request = require('request-promise'),
    _ = require('lodash'),
    config = require('../../config.json'),
    owcs = require('./lib/owcs')(config.owcs.host),
    cars = require('./lib/cars')(config);

module.exports = function (server) {

    // example of rendering the news page - minus the global nav for now
    server.route({
        method: 'GET',
        path: '/',
        handler: function (req, reply) {
            owcs.promises.getAssetDao('Page:1415909398642')
                .then(cars.renderPage(reply, 'layouts/OneColumn'))
                .catch(console.log);
        }
    });

    // parsed asset data
    server.route({
        method: 'GET',
        path: '/asset/{type}/{id}',
        handler: function (req, reply) {
            var type = req.params.type,
                id = req.params.id;

            owcs.promises.getAssetDao(owcs.functions.constructAssetRef(type, id))
                .then(function (dao) {
                    //reply(dao.getAssociatedAssets());
                    //reply(dao.getAssociatedAssets('assets'));
                    //reply(dao.getAssetData('AdvCols:1415909369289'));
                    //reply(dao.getAssetData());
                    reply(dao.get());
                })
                .catch(console.log);
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
                .catch(console.log);

        }
    });

    // navigation data
    server.route({
        method: 'GET',
        path: '/nav',
        handler: function (req, reply) {
            owcs.promises.requestNavigation().then(function (data) {
                reply(data);
            }).catch(console.log);

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
