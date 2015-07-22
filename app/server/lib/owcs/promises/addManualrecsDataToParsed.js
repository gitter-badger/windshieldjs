var Promise = require('bluebird'),
    _ = require('lodash'),
    requestAssetsFromRefs = require('./requestAssetsFromRefs'),
    parseAssetData = require('../functions/parseAssetData');

//_.mixin(require('lodash-deep'));

module.exports = function (parsed) {
    return new Promise(function (resolve, reject) {
        Promise.all(_.map(_.map(parsed.associatedAssetsData, _.flow(_.property('attributes.Manualrecs'), _.partialRight(_.map, 'assetid'))), requestAssetsFromRefs))
            .then(function (allManualRecData) {
                var manualrecsDataPromises = [];
                _.forEach(allManualRecData, function (v, i) {
                    var attrs = parsed.associatedAssetsData[i].attributes;
                    if (attrs.Manualrecs) attrs.ManualrecsData = _.map(v, parseAssetData);
                    manualrecsDataPromises.push(requestAssetsFromRefs(_.flattenDeep(_.map(_.map(attrs.ManualrecsData, _.property('associatedAssets')), _.values))));
                });
                Promise.all(manualrecsDataPromises).then(function (v) {
                    parsed.ManualrecsAssociationsData = _.map(_.flatten(v), parseAssetData);
                    resolve(parsed);
                }).catch(reject);
            }).catch(reject);
    });
};
