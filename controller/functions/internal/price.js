const Price = require("../../../models/Price");
async function getPrices() {
    const prices = await Price.find();
    return prices;
}
async function getPrice(priceId) {
    const price = await Price.find({
        _id: priceId
    });
    return price[0];
}

async function createPrice() {
    // 'plus' or 'premium'
    /*const newPrice = await Price.create({
        access: 'plus',
        type: 'monthly',
        CatalogId: 'TBVIDPXAM5OYUGCECI44WGHM'
    })
    
    const newPrice = await Price.create({
        access: 'plus',
        type: 'yearly',
        CatalogId: 'NCHQY7KH5CUUTAPYAOHE6V5V'
    })
    const newPrice = await Price.create({
        access: 'premium',
        type: 'monthly',
        CatalogId: 'X3I3S4YFLPBRWB6GRMOW5JXN'
    })
    const newPrice = await Price.create({
        access: 'premium',
        type: 'yearly',
        CatalogId: 'MUJIRZHESOQZZ3XNK3LA2NAI'
    })
    return newPrice;
    */
}

module.exports = {
    getPrices,
    getPrice,
    createPrice
}