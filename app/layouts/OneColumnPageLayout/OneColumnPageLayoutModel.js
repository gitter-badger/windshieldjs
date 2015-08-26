var path = require('path'),
    _ = require('lodash'),
    paths = require('../../resources/paths'),
    config = require(global.appConfigPath);

module.exports = function (data) {
    this.title = data.title;
    this.component = data.component;
    this.main = _.map(data.collections.main, function (item) {
        var AssocModel;
        try {
            AssocModel = require(path.join(config.appRoot, paths[item.component], item.component + 'Model'));
            return new AssocModel(item);
        } catch (e) {
            return { component: 'NotFound' };
        }
    });
};
