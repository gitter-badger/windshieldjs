var path = require('path'),
    config,
    owcsRest;

global.appConfigPath = path.join(__dirname, 'config', 'app.json');

config = require(global.appConfigPath);
config.appRoot = path.join(__dirname);
config.appDir = path.join(config.appRoot, 'app');

owcsRest = require('owcs-rest');
owcsRest.setup(config.owcs);
owcsRest.registerPlugin(require('owcs-rest-plugin-cars')({ services: config.services }));

module.exports = function (server) {

    server.connection({ port: config.server.port });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: path.join(config.appRoot),
        path: './'
    });

};
