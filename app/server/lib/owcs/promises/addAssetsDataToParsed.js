var Promise = require('bluebird'),
    _ = require('lodash'),
    requestAssetsFromRefs = require('./requestAssetsFromRefs'),
    parseAssetData = require('../functions/parseAssetData');

module.exports = function (parsed) {
    return new Promise(function (resolve, reject) {
        requestAssetsFromRefs(_.flatten(_.values(parsed.associatedAssets)) || []).then(function (assetsData) {
            parsed.associatedAssetsData = _.map(assetsData, parseAssetData);
            resolve(parsed);
        }).catch(reject);
    });
};
