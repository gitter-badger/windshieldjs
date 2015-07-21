var path = require('path'),
    request = require('request-promise'),
    _ = require('lodash'),
    config = require('../../config.json'),
    owcs = require('./lib/owcs')(config.owcs.host),
    cars = require('./lib/cars');

module.exports = function (server) {

    // example of rendering the news page - minus the global nav for now
    server.route({
        method: 'GET',
        path: '/',
        handler: function (req, reply) {
            owcs.promises.getAssetWithAssociated({ type: 'Page', id: '1415909398642' })
                .then(cars.renderPage(reply, 'news'))
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

            owcs.promises.getAssetWithAssociated({ type: type, id: id }).then(function (data) {
                reply(data);
            }).catch(console.log);

        }
    });

    // raw asset data
    server.route({
        method: 'GET',
        path: '/raw/{type}/{id}',
        handler: function (req, reply) {
            var type = req.params.type,
                id = req.params.id;

            owcs.promises.requestAsset({ type: type, id: id }).then(function (data) {
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
