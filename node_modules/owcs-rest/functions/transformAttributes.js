var _ = require('lodash');

module.exports = function transformAttributes(attributes) {
    var r = {};
    _.forEach(attributes, function (v) {

        /**
         * there is some support for the types below, but not many ... need to
         * work on adding more...
         *
         * stringValue - Holds the value in case of a single-valued STRING attribute.
         * dateValue - Holds the value in case of a single-valued DATE attribute.
         * integerValue - Holds the value in case of a single-valued INT attribute.
         * decimalValue
         * longValue - Holds the value in case of a single-valued LONG attribute.
         * doubleValue - Holds the value in case of a single-valued FLOAT or MONEY attribute.
         * booleanValue
         * blobValue - Holds the value in case of a single-valued BLOB attribute.
         * structValue - Holds the value in case of a single-valued STRUCT attribute.
         * listValue - Holds the value in case of a single-valued LIST attribute.
         * stringList - Holds the value in case of a multi-valued STRING attribute.
         * dateList - Holds the value in case of a multi-valued DATE attribute.
         * integerList - Holds the value in case of a multi-valued INT attribute.
         * decimalList
         * longList - Holds the value in case of a multi-valued LONG attribute
         * doubleList - Holds the value in case of a multi-valued FLOAT or MONEY attribute.
         * booleanList
         * blobList - Holds the value in case of a multi-valued BLOB attribute.
         * webreferenceList - Holds the value in case of a Web Reference attribute.
         * structList - Holds the value in case of a multi-valued STRUCT attribute.
         * listList - Holds the valuein case of a multi-valued LIST attribute.
         */

        function recurseWithItem(i) {
            return transformAttributes(i.item);
        }

        if (v.data) {
            if (v.data.stringValue) r[v.name] = v.data.stringValue;
            if (v.data.dateValue) r[v.name] = v.data.dateValue;
            if (v.data.integerValue) r[v.name] = v.data.integerValue;
            if (v.data.decimalValue) r[v.name] = v.data.decimalValue;
            if (v.data.longValue) r[v.name] = v.data.longValue;
            if (v.data.doubleValue) r[v.name] = v.data.doubleValue;
            if (v.data.booleanValue) r[v.name] = v.data.booleanValue;
            if (v.data.listValue) r[v.name] = _.map(v.data.listValue.item, recurseWithItem);
            if (v.data.webreferenceList) r[v.name] = v.data.webreferenceList;
        }
    });
    return r;
};
