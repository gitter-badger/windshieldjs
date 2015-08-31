var fs = require('fs'),
    path = require('path'),
    routes = [];

fs.readdirSync(__dirname)
    .filter(function (file) {
        return (fs.statSync(path.join(__dirname, file)).isFile() && (path.extname(file) === '.js'));
    }).forEach(function (file) {
        if (file !== 'index.js') routes = routes.concat(require(path.join(__dirname, file)));
    });

module.exports = routes;
