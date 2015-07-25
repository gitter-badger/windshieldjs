var assignProperty = require('./assignProperty'),
    transformAttributes = require('./transformAttributes'),
    findAssetAssociations = require('./findAssetAssociations'),
    assetPropertiesWhitelist = require('../resources/assetPropertiesWhitelist'),
    _ = require('lodash');

module.exports = function (data) {
    var parsed = {};
    assetPropertiesWhitelist.forEach(_.partial(assignProperty, parsed, data));
    parsed.attributes = transformAttributes(data.attribute);
    if (data.associations && data.associations.association) {
        parsed.associatedAssets = findAssetAssociations(data.associations.association);
        parsed.assetData = data.assetData;
    }
    return parsed;
};
