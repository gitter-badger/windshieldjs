var Promise = require('bluebird'),
    _ = require('lodash');

module.exports = function (reply) {
    return function (data) {
        return new Promise(function (resolve, reject) {
            var layout = data.layout;
            try {
                resolve(require('./' + layout + '/' + _.camelCase(layout) + 'Ctrl')(reply, data));
            } catch (e) {
                reject('layout `' + layout + '` not found. ' + e);
            }
        });
    };
};
