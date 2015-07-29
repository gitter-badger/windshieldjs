var _ = require('lodash'),
    config = require('./resources/config'),
    promises = require('./promises'),
    functions = require('./functions'),
    dao = require('./dao'),
    plugins = require('./plugins'),
    owcs = {
        promises: promises,
        functions: functions,
        dao: dao,
        plugins: plugins
    };

function configure(options) {
    config.host = options.host;
}
owcs.configure = configure;

function registerPlugin(plugin) {
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
}
owcs.registerPlugin = registerPlugin;

module.exports = owcs;
