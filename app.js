var Hapi = require('hapi'),
    server = new Hapi.Server(),
    path = require('path');

server.connection({ port: 1337 });

server.views({
    engines: {
        html: require('handlebars')
    },
    relativeTo: path.join(__dirname, 'view'),
    path: 'templates',
    helpersPath: 'helpers'
});

server.route({
    method: 'GET',
    path: '/',
    handler: function (request, reply) {
        reply.view('layout');
    }
});

server.route({
    method: 'GET',
    path: '/static/{param*}',
    handler: {
        directory: {
            path: path.join(__dirname, '..', 'www-cars-com-static', 'dist')
        }
    }
});

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
