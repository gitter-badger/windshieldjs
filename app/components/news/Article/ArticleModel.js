var _ = require('lodash');

module.exports = function (data) {
    this.partial = data.partial;
    this.id = data.id;
    this.name = data.name;
    this.subtype = data.subtype;
    this.headline = data.attributes.headline;
    this.body = data.attributes.body;
};
