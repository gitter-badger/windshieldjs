var _ = require('lodash');

module.exports = function (component) {
    this.component = component.name;
    this.partial = component.partial;
    this.id = component.data.id;
    this.name = component.data.name;
    this.headline = component.data.attributes.headline;
    this.body = component.data.attributes.body;
};
