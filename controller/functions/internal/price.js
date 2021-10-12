const isEmpty = require("is-empty");
const Price = require("../../../models/Price");
async function getPrices() {
    const prices = await Price.find();
    return prices;
}
async function getPrice(type) {
    const price = await Price.find({
        type: type
    });
    if(isEmpty(price)){ 
        const price = await Price.find({
            access: type
        });
        return price
    }
    return price;
}

async function getPriceByCatalogId(CatalogId) {
    const price = await Price.find({
        CatalogId: CatalogId
    });
    return price && price[0];
}

/*
async function createPrice() {
    // 'plus' or 'premium'
    
    const newPrice = await Price.create({
        access: 'plus',
        type: 'monthly',
        CatalogId: 'FV4VOOUCA5YT7Y5RZCKQZN4S'
    })
    
    return [newPrice];
}
*/

async function deletePrice(priceId) {
    try {
        const price = await Price.deleteOne({
            _id: priceId
        });
        return price
    } catch (err) {
        return err
    }
}

module.exports = {
    getPrices,
    getPrice,
    getPriceByCatalogId,
    //createPrice,
    deletePrice
}