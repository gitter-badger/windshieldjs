var Promise = require('bluebird'),
    _ = require('lodash'),
    requestAssetsFromRefs = require('./requestAssetsFromRefs'),
    parseAssetData = require('../functions/parseAssetData');

//_.mixin(require('lodash-deep'));

module.exports = function (parsed) {
    return new Promise(function (resolve, reject) {
        var assetRequests;

        if (parsed.assetData) {
            assetRequests = _.map(parsed.assetData,
                _.flow(
                    _.property('attributes.Manualrecs'),
                    _.partialRight(_.map, 'assetid'),
                    requestAssetsFromRefs));

            Promise.all(assetRequests).then(function (data) {
                var promises = [];
                _.forEach(data, function (v, i) {
                    var attrs = parsed.assetData[i].attributes,
                        manualRecsData;
                    if (attrs.Manualrecs) {
                        manualRecsData = _.map(v, parseAssetData);
                        parsed.assetData = parsed.assetData.concat(manualRecsData);
                        promises.push(requestAssetsFromRefs(_.flattenDeep(_.map(manualRecsData, _.flow(_.property('associatedAssets'), _.values)))));
                    }
                });
                Promise.all(promises).then(function (v) {
                    parsed.assetData = parsed.assetData.concat(_.map(_.flatten(v), parseAssetData));
                    resolve(parsed);
                }).catch(reject);
            }).catch(reject);
        } else {
            resolve(parsed);
        }
    });
};
