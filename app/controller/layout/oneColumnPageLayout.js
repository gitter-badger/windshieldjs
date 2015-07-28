var Promise = require('bluebird'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    config = require('../../../config.json'),
    owcs = require(path.join(config.approot, 'lib', 'owcs'))(config.owcs),
    model = require('../../model'),
    logger = require('../../logger'),
    generatePartialName = require('../../util/generatePartialName');

module.exports = function (reply, assetDao) {
    var layout = new model.OneColumnPageLayout(assetDao);
    Promise.all(_.map(layout.assoc, function (asset) {
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
        reply.view('layout/OneColumn', layout);
    });
};
