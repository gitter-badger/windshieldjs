var path = require('path'),
    config = require('../config.json');

module.exports = function (server) {

    config.approot = path.join(__dirname, '..');

    server.connection({ port: config.port });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: path.join(__dirname, 'server', 'views'),
        path: 'templates',
        helpersPath: 'helpers'
    });

};
