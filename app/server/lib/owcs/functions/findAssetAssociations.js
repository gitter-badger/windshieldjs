var _ = require('lodash');

module.exports = function (associationData) {
    var assetsData = _.findWhere(associationData, { name: 'assets' });
    return (typeof assetsData === 'object') ? assetsData.associatedAsset || [] : [];
};
