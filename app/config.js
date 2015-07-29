var path = require('path'),
    config = require('../config.json'),
    owcs,
    owcsPluginMis;

config.approot = path.join(__dirname, '..');

owcs = require(path.join(config.approot, 'lib', 'owcs'));
owcsPluginMis = require(path.join(config.approot, 'lib', 'owcs-plugin-mis'));

module.exports = function (server) {

    owcs.configure(config.owcs);
    owcs.registerPlugin(owcsPluginMis);

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
