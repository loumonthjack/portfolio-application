const Price = require("../../../portfolio-application/models/Price");

async function getAllPrices(){
    const prices = await Price.find();
    return prices;
}
async function getPrice(priceId){
    const price = await Price.find({_id:priceId});
    return price
}

module.exports={
    getAllPrices,
    getPrice
}