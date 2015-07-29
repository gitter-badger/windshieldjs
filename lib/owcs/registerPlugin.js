var plugins = require('./plugins'),
    dao = require('./dao'),
    _ = require('lodash');

module.exports = function (plugin) {
    var k;
    if (plugin.dao) {
        if (plugin.dao.extensions) {
            for (k in plugin.dao.extensions) {
                if (plugin.dao.extensions.hasOwnProperty(k)) {
                    _.assign(dao[k].prototype, plugin.dao.extensions[k]);
                }
            }
        }
    }
    if (plugin.promises) {
        if (plugin.promises.decorators) {
            plugins.decorators = plugin.promises.decorators;
        }
    }
};
