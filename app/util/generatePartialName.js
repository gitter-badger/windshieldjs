module.exports = function (subtype, assetRef) {
    return subtype + assetRef.replace(':', '').replace('_', '');
};
