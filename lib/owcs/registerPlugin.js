var plugins = require('./plugins'),
    dao = require('./dao'),
    _ = require('lodash');

module.exports = function (plugin) {
    var k;

    function GenericDao(data) {
        this.__data = data;
    }

    GenericDao.prototype.get = function () {
        return this.__data;
    };

    if (plugin.daoExtensions) {
        for (k in plugin.daoExtensions) {
            if (plugin.daoExtensions.hasOwnProperty(k)) {
                dao[k] = dao[k] || GenericDao;
                _.assign(dao[k].prototype, plugin.daoExtensions[k]);
            }
        }
    }

    if (plugin.hooks) {
        plugins.hooks = plugin.hooks;
    }
};
