var Promise = require('bluebird'),
    _ = require('lodash'),
    requestAssetsFromRefs = require('./requestAssetsFromRefs'),
    parseAssetData = require('../functions/parseAssetData');


module.exports = function (parsed) {
    return new Promise(function (resolve, reject) {
        if (parsed.assetData) {
            requestAssetsFromRefs(_.flatten(_.values(parsed.associatedAssets)) || []).then(function (data) {
                parsed.assetData = parsed.assetData.concat(_.map(data, parseAssetData));
                resolve(parsed);
            }).catch(reject);
        } else {
            resolve(parsed);
        }
    });
};
