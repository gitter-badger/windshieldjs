var path = require('path'),
    _ = require('lodash'),
    paths = require('../../../resources/paths');

module.exports = function (data) {
    this.title = data.title;
    this.assoc = _.map(data.assoc, function (item) {
        var AssocModel;
        try {
            AssocModel = require(path.join('..', '..', paths[item.componentName], item.componentName + 'Model'));
            return new AssocModel(item);
        } catch (e) {
            return { componentName: 'NotFound' };
        }
    });
};
