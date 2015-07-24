var assignProperty = require('./assignProperty'),
    transformAttributes = require('./transformAttributes'),
    findAssetAssociations = require('./findAssetAssociations');

module.exports = function (data) {
    var parsed = {};
    assignProperty(parsed, data, 'id');
    assignProperty(parsed, data, 'externalid');
    assignProperty(parsed, data, 'name');
    assignProperty(parsed, data, 'createdby');
    assignProperty(parsed, data, 'createddate');
    assignProperty(parsed, data, 'description');
    assignProperty(parsed, data, 'subtype');
    assignProperty(parsed, data, 'updatedby');
    assignProperty(parsed, data, 'updateddate');
    parsed.attributes = transformAttributes(data.attribute);
    if (data.associations && data.associations.association) {
        parsed.associatedAssets = findAssetAssociations(data.associations.association);
        parsed.assetData = data.assetData;
    }
    return parsed;
};
