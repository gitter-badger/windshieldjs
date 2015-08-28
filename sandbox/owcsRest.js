require('newrelic');

var Hapi = new require('hapi'),
    server = new Hapi.Server(),
    owcsRest = require('owcs-rest');

require('../src/bootstrap')(server);

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

        owcsRest.promises.requestAsset(owcsRest.functions.constructAssetRef(type, id))
            .then(reply)
            .catch(console.log);

    }
});

server.route({
	method: 'GET',
	path: '/navigation/{type}/{id}',
	handler: function (req, reply) {
		var type = req.params.type,
		    id = req.params.id;
		owcsRest.promises.requestAsset(owcsRest.functions.constructAssetRef(type, id))
			.then(owcsRest.promises.requestNavigation)
			.then(reply)
			.catch(console.log);
	}
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});

