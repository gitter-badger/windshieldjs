var path = require('path'),
    _ = require('lodash'),
    paths = require('../../resources/paths'),
    config = require(global.appConfigPath);

module.exports = function (data) {
    this.title = data.title;
    this.layout = data.layout;
    this.main = _.map(data.associations.main, function (item) {
        var AssocModel;
        try {
            AssocModel = require(path.join(config.appRoot, paths[item.component], item.component + 'Model'));
            return new AssocModel(item);
        } catch (e) {
            return { component: 'NotFound' };
        }
    });
};
