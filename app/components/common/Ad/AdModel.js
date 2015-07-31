module.exports = function (data) {
    this.componentName = data.subtype;
    this.partial = data.partial;
    this.id = data.id;
    this.name = data.name;
    this.adSlot = data.attributes.adSlot;
    this.adSize = data.attributes.adSize;
};
