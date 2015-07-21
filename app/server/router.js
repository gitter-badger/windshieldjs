var path = require('path'),
    request = require('request-promise'),
    _ = require('lodash'),
    config = require('../../config.json'),
    owcs = require('./lib/owcs');

module.exports = function (server) {

    // example of rendering the news page - minus the global nav for now
    server.route({
        method: 'GET',
        path: '/',
        handler: function (req, reply) {
            owcs.getAssetWithAssociated({ type: 'Page', id: 1415909398642 }).then(function (data) {
                var parsed = {};
                parsed.name = data.name;
                parsed.carouselItems = _.map(data.associatedAssetsData[0].attributes.ManualrecsData, function (item) {
                    var parsed = {};
                    parsed.name = item.name;
                    parsed.href = item.attributes.Webreference[0].url;
                    return parsed;
                });
                reply.view('news', parsed);
            }).catch(console.log);
        }
    });

    // asset API Example
    server.route({
        method: 'GET',
        path: '/asset/{type}/{id}',
        handler: function (req, reply) {
            var type = req.params.type,
                id = req.params.id;

            owcs.getAssetWithAssociated({ type: type, id: id }).then(function (data) {
                reply(data);
            }).catch(console.log);

        }
    });

    // Static server - could just as easily do this via nginx
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
