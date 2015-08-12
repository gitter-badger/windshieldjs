var _ = require('lodash');

module.exports = function (data) {
    this.component = data.component;
    this.partial = data.partial;
    this.id = data.id;
    this.name = data.name;
    this.headline = data.attributes.headline;
    this.body = data.attributes.body;
};
