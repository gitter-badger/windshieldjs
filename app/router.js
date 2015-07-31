var path = require('path'),
    _ = require('lodash'),
    config = require('../config.json'),
    owcsAdapter = require('./adapters/owcs'),
    components = require('./components'),
    logger = require('./utils/logger');

module.exports = function (server) {

    server.route({
        method: 'GET',
        path: '/cs/Sites',
        handler: function (req, reply) {
            owcsAdapter.getDataFromWebref(req.query.lookuppage)
                .then(components.layout.renderCtrl(reply))
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












































// the following is just for inspecting owcs data ... not used rendering
/* eslint vars-on-top: 0 */
/*
var owcsRest = require(path.join(config.appRoot, 'lib', 'owcs-rest'));
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
