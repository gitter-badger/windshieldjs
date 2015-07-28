var Promise = require('bluebird'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    config = require('../../../config.json'),
    owcs = require(path.join(config.approot, 'lib', 'owcs'))(config.owcs),
    model = require('../../model'),
    logger = require('../../logger');

module.exports = function (reply, assetDao) {
    var parsed = {};

    parsed.title = assetDao.attr('title');
    parsed.assoc = [];

    function generatePartialName(subtype, assetRef) {
        return subtype + assetRef.replace(':', '').replace('_', '');
    }

    Promise.all(_.map(assetDao.getAssociatedAssets('assets'), function (assetRef) {
        var assocDao = owcs.functions.createAssetDao(assetDao.getAssetData(assetRef)),
            asset;

        try {
            asset = new model[assocDao.prop('subtype')](assocDao, assetDao);
            asset.partial = generatePartialName(asset.subtype, asset.id);
        } catch (e) {
            asset = { subtype: 'NotFound' };
        }

        parsed.assoc.push(asset);

        return Promise.promisify(fs.readFile)(path.join(config.approot, 'app', 'view', 'template', 'subtype', asset.subtype, 'default.html'), 'utf-8').then(function (source) {
            return new Promise(function (resolve, reject) {
                resolve({
                    name: asset.partial,
                    source: source
                });
            });
        });

    })).then(function (partials) {
        _.forEach(partials, function (partial) {
            handlebars.registerPartial(partial.name, partial.source);
        });
        reply.view('layout/OneColumn', parsed);
    });
};
