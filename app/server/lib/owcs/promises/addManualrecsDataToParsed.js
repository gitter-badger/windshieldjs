var Promise = require('bluebird'),
    _ = require('lodash'),
    getAssetsDataFromRefs = require('./getAssetsDataFromRefs'),
    parseAssetData = require('../functions/parseAssetData');

module.exports = function (parsed) {
    return new Promise(function (resolve, reject) {
        Promise.all(_.map(parsed.associatedAssetsData, _.flow(_.property('attributes.Manualrecs'), _.partialRight(_.map, 'assetid'))).map(function (v) {
            return getAssetsDataFromRefs(v);
        })).then(function (allManualRecData) {
            _.forEach(allManualRecData, function (v, i) {
                var attrs = parsed.associatedAssetsData[i].attributes;
                if (attrs.Manualrecs) attrs.ManualrecsData = _.map(v, parseAssetData);
            });
            resolve(parsed);
        }).catch(reject);
    });
};
