require('newrelic');

var Hapi = new require('hapi'),
    server = new Hapi.Server();

require('./bootstrap')(server);
require('./app/router')(server);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
