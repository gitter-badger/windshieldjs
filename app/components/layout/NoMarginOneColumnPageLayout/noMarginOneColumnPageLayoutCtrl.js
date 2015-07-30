var Promise = require('bluebird'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    config = require('../../../../config.json'),
    Model = require('./NoMarginOneColumnPageLayoutModel'),
    paths = require('../../../resources/paths.json');

module.exports = function (reply, assetDao) {
    var layout = new Model(assetDao);
    Promise.all(_.map(layout.assoc, function (asset) {
        return Promise.promisify(fs.readFile)(path.join(config.componentsDir, paths[asset.subtype], 'templates', 'default.html'), 'utf-8').then(function (source) {
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
        reply.view('components/layout/OneColumnPageLayout/OneColumnPageLayoutTemplate', layout);
    });
};
