var config = require('../resources/config'),
    parseAssetRef = require('./parseAssetRef');

module.exports = function (assetref) {
    var asset = parseAssetRef(assetref);
    return config.host + '/cs/REST/sites/www-cars-com/types/' + asset.type + '/assets/' + asset.id;
};
