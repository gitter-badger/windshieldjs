var path = require('path'),
    util = require('../../util'),
    routes = [];

util.getFiles(__dirname).forEach(function (file) {
    if (file !== 'index.js') routes = routes.concat(require(path.join(__dirname, file)));
});

module.exports = routes;
