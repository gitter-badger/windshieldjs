var path = require('path'),
    request = require('request-promise'),
    _ = require('lodash'),
    config = require(path.join('..', '..', 'config.json')),
    owcs = require(path.join(config.approot, 'lib', 'owcs'))(config.owcs.host),
    controllers = require('./controllers')(config);

module.exports = function (server) {

    // example of rendering the news page - minus the global nav for now
    server.route({
        method: 'GET',
        path: '/',
        handler: function (req, reply) {
            owcs.promises.getAssetDao('Page:1415909398642', 4)
                .then(controllers.renderPage(reply, 'layouts/OneColumn'))
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

            owcs.promises.getAssetDao(owcs.functions.constructAssetRef(type, id), 4)
                .then(function (dao) {
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
