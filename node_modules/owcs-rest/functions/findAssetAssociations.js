module.exports = function (associationData) {
    var result = {};
    associationData.forEach(function (v) {
        result[v.name] = v.associatedAsset;
    });
    return result;
};
