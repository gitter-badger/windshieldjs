var path = require('path'),
    _ = require('lodash'),
    paths = require('../../resources/paths'),
    config = require(global.appConfigPath);

module.exports = function (data) {
    this.title = data.title;
    this.layout = data.layout;
    this.main = _.map(data.associations.main, function (component) {
        var AssocModel;
        try {
            AssocModel = require(path.join(config.appRoot, paths[component.name], component.name + 'Model'));
            return new AssocModel(component);
        } catch (e) {
            return { component: 'NotFound' };
        }
    });
};
