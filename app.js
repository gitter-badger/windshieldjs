require('newrelic');

var Hapi = new require('hapi'),
    server = new Hapi.Server();

require('./bootstrap')(server);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
