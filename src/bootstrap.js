var path = require('path'),
    _ = require('lodash'),
    envConfigPath = path.join(__dirname, '..', 'env.json'),
    envConfig,
    config,
    owcsRest;

// global
global.appConfigPath = path.join(__dirname, 'config.json');

// config dynamic assignments
config = require(global.appConfigPath);

try {
    envConfig = require(envConfigPath);
} catch (e) {
    envConfig = {};
}

_.assign(config, envConfig);

config.appRoot = path.join(__dirname);
config.appDir = path.join(config.appRoot, 'app');

// owcs plugin config
owcsRest = require('owcs-rest');
owcsRest.setup(config.owcs);
owcsRest.registerPlugin(require('owcs-rest-plugin-cars')({ services: config.services }));

// server instance dependent config
module.exports = function (server) {
    if (server == null) return;

    server.connection({ port: config.server.port });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: path.join(config.appRoot),
        path: './'
    });
};
