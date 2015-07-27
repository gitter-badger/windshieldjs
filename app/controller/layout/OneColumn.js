var Promise = require('bluebird'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    config = require('../../../config.json'),
    owcs = require(path.join(config.approot, 'lib', 'owcs'))(config.owcs),
    subtypeCtrl = require('../subtype'),
    logger = require('../../logger'),
    Boom = require('boom');

module.exports = {
    render: function (reply) {

        return function (assetDao) {
            var parsed = {};

            parsed.title = assetDao.attr('title');
            parsed.slots = [];

            try {
                Promise.all(_.map(assetDao.getAssociatedAssets('assets'), function (assetRef) {
                    var assocDao = owcs.functions.createAssetDao(assetDao.getAssetData(assetRef)),
                        asset = subtypeCtrl[_.camelCase(assocDao.prop('subtype'))](assocDao, assetDao);

                    parsed.slots.push(asset);

                    return Promise.promisify(fs.readFile)(path.join(config.approot, 'app', 'view', 'template', 'subtype', asset.subtype, 'default.html'), 'utf-8').then(function (source) {
                        return new Promise(function (resolve, reject) {
                            resolve({
                                name: asset.subtype,
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
            } catch (e) {
                logger.error(e);
                reply(Boom.badImplementation());
            }

        };
    }
};
