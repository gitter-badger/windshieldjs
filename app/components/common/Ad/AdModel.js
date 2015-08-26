module.exports = function (component) {
    this.component = component.name;
    this.partial = component.partial;
    this.id = component.data.id;
    this.name = component.data.name;
    this.adSlot = component.data.attributes.adSlot;
    this.adSize = component.data.attributes.adSize;
};
