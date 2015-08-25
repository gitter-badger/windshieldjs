var Promise = require('bluebird'),
    _ = require('lodash'),
    handlebars = require('handlebars'),
    fs = require('fs'),
    path = require('path'),
    config = require(global.configPath),
    Model = require('./OneColumnPageLayoutModel'),
    paths = require('../../resources/paths.json');

module.exports = function (reply, data) {
    var layout = new Model(data);
    Promise.all(_.map(layout.main, function (item) {
        return Promise.promisify(fs.readFile)(path.join(config.appDir, paths[item.component], 'templates', 'default.html'), 'utf-8').then(function (source) {
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
        reply.view('layouts/OneColumnPageLayout/OneColumnPageLayoutTemplate', layout);
    });
};
