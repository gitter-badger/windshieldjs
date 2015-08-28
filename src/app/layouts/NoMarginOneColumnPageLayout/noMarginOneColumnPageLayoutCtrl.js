var Promise = require('bluebird'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    config = require(global.appConfigPath),
    Model = require('../OneColumnPageLayout/OneColumnPageLayoutModel'),
    paths = require('../../resources/paths.json');

module.exports = function (reply, data) {
    var model = new Model(data);
    return Promise.all(_.map(model.main, function (item) {
        return Promise.promisify(fs.readFile)(path.join(config.appRoot, paths[item.component], 'templates', 'default.html'), 'utf-8').then(function (source) {
            return new Promise(function (resolve, reject) {
                resolve({
                    name: item.partial,
                    source: source
                });
            });
        });
    })).then(function (partials) {
        _.forEach(partials, function (partial) {
            handlebars.registerPartial(partial.name, partial.source);
        });
        reply.view(path.join(paths['OneColumnPageLayout'], 'OneColumnPageLayoutTemplate'), model);
    });
};
