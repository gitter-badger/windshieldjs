var Promise = require('bluebird'),
    _ = require('lodash'),
    logger = require('../../logger');

module.exports = function (reply, webreference) {
    return function (assetDao) {
        return new Promise(function (resolve, reject) {
            var layout = _.findWhere(assetDao.attr('Webreference'), { url: webreference }).template.split('/').pop();
            try {
                resolve(require('./' + _.camelCase(layout))(reply, assetDao));
            } catch (e) {
                reject('layout `' + layout + '` not found');
            }
        });
    };
};
