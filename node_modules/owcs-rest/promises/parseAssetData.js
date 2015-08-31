var Promise = require('bluebird'),
    parseAssetData = require('../functions/parseAssetData');

module.exports = function (data) {
    return new Promise(function (resolve, reject) {
        var parsed;
        try {
            parsed = parseAssetData(data);
        } catch (e) {
            reject(e);
        }
        resolve(parsed);
    });
};
