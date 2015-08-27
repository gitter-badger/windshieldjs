var Promise = require('bluebird'),
    owcsRest = require('owcs-rest'),
    generatePartialName = require('./generatePartialName');

// this searches by assetRef ... which isn't going to work
// since asset refs are different between environments
// this is just to test the waters ... we'll need to change
// it to work via search
module.exports = function (context) {
    return new Promise(function (resolve, reject) {
        owcsRest.promises.getAssetDao(context.assetRef, 4)
            .then(function (assetDao) {
                var asset = {};
                asset.data = assetDao.get();
                asset.name = asset.data.subtype;
                asset.partial = generatePartialName(asset.data.subtype, asset.data.id);
                resolve(asset);
            })
            .catch(reject);
    });
};
