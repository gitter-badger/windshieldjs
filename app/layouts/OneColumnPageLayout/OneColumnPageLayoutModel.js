var path = require('path'),
    _ = require('lodash'),
    paths = require('../../resources/paths');

module.exports = function (data) {
    this.title = data.title;
    this.main = _.map(data.collections.main, function (item) {
        var AssocModel;
        try {
            AssocModel = require(path.join('..', '..', paths[item.component], item.component + 'Model'));
            return new AssocModel(item);
        } catch (e) {
            return { component: 'NotFound' };
        }
    });
};
