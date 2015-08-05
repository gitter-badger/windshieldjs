var Hapi = require('hapi'),
    server = new Hapi.Server();

require('newrelic');
require('./app/setup')(server);
require('./app/router')(server);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
