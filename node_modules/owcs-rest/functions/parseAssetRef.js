module.exports = function (assetRef) {
    var parsed = {},
        assetParts = assetRef.split(':');
    parsed.type = assetParts[0];
    parsed.id = assetParts[1];
    return parsed;
};
