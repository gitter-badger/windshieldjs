require('newrelic');
/*
require('appdynamics').profile({
        controllerHostName: 'paid138.saas.appdynamics.com',
        controllerPort: 443, // If SSL, be sure to enable the next line     controllerSslEnabled: true // Optional - use if connecting to controller via SSL  
        controllerSslEnabled: true,
        accountName: 'Carscom', // Required for a controller running in multi-tenant mode
        accountAccessKey: 'ajjnhjks4jnh', // Required for a controller running in multi-tenant mode
        applicationName: 'windshield',
        tierName: 'development',
        nodeName: 'process' // The controller will automatically append the node name with a unique number
});
*/

var Hapi = require('hapi'),
    server = new Hapi.Server(),
    path = require('path');

require('./app/setup')(server);
require('./app/router')(server);

server.start(function () {
    console.log('Server running at:', server.info.uri);
});
