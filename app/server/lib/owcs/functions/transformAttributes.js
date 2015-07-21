var _ = require('lodash');

module.exports = function transformAttributes(attributes) {
    var r = {};
    _.forEach(attributes, function (v) {
        if (v.data) {
            if (v.data.stringValue) r[v.name] = v.data.stringValue;
            if (v.data.longValue) r[v.name] = v.data.longValue;
            if (v.data.listValue) r[v.name] = _.map(v.data.listValue.item, function (i) {
                return transformAttributes(i.item);
            });
            if (v.data.webreferenceList) r[v.name] = v.data.webreferenceList;
        }
    });
    return r;
};
