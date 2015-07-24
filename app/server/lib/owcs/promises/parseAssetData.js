var Promise = require('bluebird'),
    parseAssetData = require('../functions/parseAssetData');

module.exports = function (data) {
    return new Promise(function (resolve, reject) {
        if (data.associations && data.associations.association) {
            data.assetData = [];
        }
        resolve(parseAssetData(data));
    });
};
