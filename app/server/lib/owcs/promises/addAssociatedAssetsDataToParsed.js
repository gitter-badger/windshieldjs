var Promise = require('bluebird'),
    _ = require('lodash'),
    requestAssetsFromRefs = require('./requestAssetsFromRefs'),
    parseAssetData = require('../functions/parseAssetData');


module.exports = function (parsed) {
    return new Promise(function (resolve, reject) {
        if (parsed.associatedAssetsData) {
            requestAssetsFromRefs(_.flatten(_.values(parsed.associatedAssets)) || []).then(function (data) {
                parsed.associatedAssetsData = parsed.associatedAssetsData.concat(_.map(data, parseAssetData));
                resolve(parsed);
            }).catch(reject);
        } else {
            resolve(parsed);
        }
    });
};
