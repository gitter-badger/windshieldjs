var path = require('path'),
    util = require('../util'),
    routeDir = path.join(__dirname, 'routes'),
    routes = [];

util.getFiles(routeDir).forEach(function (file) {
    routes = routes.concat(require(path.join(routeDir, file)));
});

module.exports = routes;
