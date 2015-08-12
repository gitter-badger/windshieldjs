var Promise = require('bluebird'),
    _ = require('lodash');

module.exports = function (reply) {
    return function (data) {
        return new Promise(function (resolve, reject) {
            var component = data.component;
            try {
                resolve(require('./' + component + '/' + _.camelCase(component) + 'Ctrl')(reply, data));
            } catch (e) {
                reject('layout `' + component + '` not found. ' + e);
            }
        });
    };
};
