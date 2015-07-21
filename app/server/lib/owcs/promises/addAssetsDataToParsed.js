var Promise = require('bluebird'),
    _ = require('lodash'),
    getAssetsDataFromRefs = require('./getAssetsDataFromRefs'),
    parseAssetData = require('../functions/parseAssetData');

module.exports = function (parsed) {
    return new Promise(function (resolve, reject) {
        getAssetsDataFromRefs(parsed.associatedAssets || []).then(function (assetsData) {
            parsed.associatedAssetsData = _.map(assetsData, parseAssetData);
            resolve(parsed);
        }).catch(reject);
    });
};
