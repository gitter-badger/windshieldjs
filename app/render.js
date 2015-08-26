var path = require('path'),
    Promise = require('bluebird'),
    _ = require('lodash');

module.exports = function (reply) {
    return function (data) {
        return new Promise(function (resolve, reject) {
            var layout = data.layout;
            try {
                resolve(require(path.join(__dirname, 'layouts', layout, _.camelCase(layout) + 'Ctrl'))(reply, data));
            } catch (e) {
                reject('layout `' + layout + '` not found. ' + e);
            }
        });
    };
};
