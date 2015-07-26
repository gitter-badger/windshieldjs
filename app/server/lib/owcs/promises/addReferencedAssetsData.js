var Promise = require('bluebird'),
    _ = require('lodash'),
    getAssetRefs = require('../functions/getAssetRefs'),
    requestAssetsFromRefs = require('./requestAssetsFromRefs'),
    parseAssetData = require('../functions/parseAssetData');

module.exports = function (depth) {
    return function (data) {
        var i = 1,
            aquired = [];
        data.assetData = [];
        function addAssetsData(subject, finalResolve) {
            return new Promise(function (resolve, reject) {
                var refs = getAssetRefs(subject);
                _.spread(_.partial(_.pull, refs))(aquired);
                _.remove(refs, function (v) {
                    return /^PageDefinition\:|PageAttribute\:|AttrTypes\:|CARS_A\:|CARS_CD\:|CARS_F\:/.test(v);
                });
                aquired = aquired.concat(refs);
                finalResolve = (finalResolve != null) ? finalResolve : resolve;
                requestAssetsFromRefs(refs).then(function (assetData) {
                    data.assetData = data.assetData.concat(_.map(assetData, parseAssetData));
                    if (i < depth) {
                        addAssetsData(assetData, finalResolve);
                        i++;
                    } else {
                        i = 1;
                        aquired = [];
                        finalResolve(data);
                    }
                }).catch(reject);
            });
        }
        return addAssetsData(data);
    };
};
