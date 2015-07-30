var path = require('path'),
    config = require('../config.json'),
    owcsRest;

config.appRoot = path.join(__dirname, '..');
config.appDir = path.join(config.appRoot, 'app');
config.componentsDir = path.join(config.appDir, 'components');

owcsRest = require(path.join(config.appRoot, 'lib', 'owcs-rest'));
owcsRest.configure(config.owcs);
owcsRest.registerPlugin(require(path.join(config.appRoot, 'lib', 'owcs-rest-plugin-cars-mediainquiryservice')));

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
