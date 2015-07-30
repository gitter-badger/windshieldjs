module.exports = {
    getNonStockImageUrl: function (assetRef) {
        if (assetRef == null) throw new Error('assetRef is required');
        return this.get().nonStockImageUrls ? this.get().nonStockImageUrls[assetRef] : '';
    }
};
