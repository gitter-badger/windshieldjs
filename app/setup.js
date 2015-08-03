var path = require('path'),
    config = require('../config.json'),
    owcsRest;

config.appRoot = path.join(__dirname, '..');
config.appDir = path.join(config.appRoot, 'app');
config.componentsDir = path.join(config.appDir, 'components');
config.profile = (process.env.NODE_PROFILE === 'wtf');

owcsRest = require(path.join(config.appRoot, 'lib', 'owcs-rest'));
owcsRest.setup(config.owcs);
owcsRest.registerPlugin(require(path.join(config.appRoot, 'lib', 'owcs-rest-plugin-cars'))({ services: config.services }));

module.exports = function (server) {

    server.connection({ port: config.port });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: path.join(__dirname),
        path: './'
    });

};
