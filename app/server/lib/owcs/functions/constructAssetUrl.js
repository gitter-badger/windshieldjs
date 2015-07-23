var data = require('../data'),
    parseAssetRef = require('./parseAssetRef');

module.exports = function (assetref) {
    var asset = parseAssetRef(assetref);
    return data.config.host + '/cs/REST/sites/www-cars-com/types/' + asset.type + '/assets/' + asset.id;
};
