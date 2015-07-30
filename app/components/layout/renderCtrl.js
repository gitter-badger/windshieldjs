var Promise = require('bluebird'),
    path = require('path'),
    _ = require('lodash'),
    logger = require('../../logger');

module.exports = function (reply, webreference) {
    return function (assetDao) {
        return new Promise(function (resolve, reject) {
            var layout = _.findWhere(assetDao.attr('Webreference'), { url: webreference }).template.split('/').pop();
            try {
                resolve(require('./' + layout + '/' + _.camelCase(layout) + 'Ctrl')(reply, assetDao));
            } catch (e) {
                reject('layout `' + layout + '` not found');
            }
        });
    };
};
