var fs = require('fs'),
    path = require('path'),
    routes = [];

(function(dir) {
    return fs.readdirSync(dir)
        .filter(function (file) {
            var stat = fs.statSync(path.join(dir, file));
            return (stat.isFile() && (path.extname(file) === '.js'));
        });
})(__dirname).forEach(function (file) {
    if (file !== 'index.js') routes = routes.concat(require(path.join(__dirname, file)));
});

module.exports = routes;
