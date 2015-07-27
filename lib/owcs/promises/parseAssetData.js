var Promise = require('bluebird'),
    parseAssetData = require('../functions/parseAssetData');

module.exports = function (data) {
    return new Promise(function (resolve, reject) {
        resolve(parseAssetData(data));
    });
};
