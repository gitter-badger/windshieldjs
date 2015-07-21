var Promise = require('bluebird'),
    _ = require('lodash'),
    requestAssetsFromRefs = require('./requestAssetsFromRefs'),
    parseAssetData = require('../functions/parseAssetData');

module.exports = function (parsed) {
    return new Promise(function (resolve, reject) {
        Promise.all(_.map(parsed.associatedAssetsData, _.flow(_.property('attributes.Manualrecs'), _.partialRight(_.map, 'assetid'))).map(function (v) {
            return requestAssetsFromRefs(v);
        })).then(function (allManualRecData) {
            _.forEach(allManualRecData, function (v, i) {
                var attrs = parsed.associatedAssetsData[i].attributes;
                if (attrs.Manualrecs) attrs.ManualrecsData = _.map(v, parseAssetData);
            });
            resolve(parsed);
        }).catch(reject);
    });
};
