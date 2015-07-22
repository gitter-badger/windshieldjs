var _ = require('lodash');

module.exports = function (associationData) {
    var result = {};
    _.forEach(associationData, function (v) {
        result[v.name] = v.associatedAsset;
    });
    return result;
};
