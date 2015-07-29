var path = require('path'),
    config = require('../config.json'),
    owcs;

config.approot = path.join(__dirname, '..');

owcs = require(path.join(config.approot, 'lib', 'owcs'));
owcs.configure(config.owcs);
owcs.registerPlugin(require(path.join(config.approot, 'lib', 'owcs-plugin-mis')));

module.exports = function (server) {


    server.connection({ port: config.port });

    server.views({
        engines: {
            html: require('handlebars')
        },
        relativeTo: path.join(__dirname, 'view'),
        path: 'template',
        helpersPath: 'helper'
    });

};
