var _ = require('lodash');

module.exports = function (data) {
    var r = /^\w{1,64}\:[0-9]{13}$/;
    delete data.id;
    return _.unique(_.filter((function (obj) {
        var str = [];
        (function getStr(sub) {
            _.forEach(sub, function (v) {
                if (_.isObject(v)) {
                    getStr(_.values(v));
                } else if (_.isArray(v)) {
                    _.forEach(v, getStr);
                } else if (_.isString(v)) {
                    str.push(v);
                }
            });
        }(obj));
        return str;
    }(data)), r.test.bind(r)));
};
