const Payment = require("../../../models/Payment");
const Price = require("../internal/price")

async function getPayment(paymentId) {
    const payment = await Payment.find({
        _id: paymentId
    });
    return payment;
}

async function getUserPayments(userId) {
    const payments = await Payment.find({
        userId: userId
    })
    return payments
}

//CREATE PAYMENT
async function createPayment(userId, subscription){
    const price = await Price.getPriceByCatalogId(subscription.planId)
    const payment = await Payment.create({
        userId: userId,
        priceId: price.id,
        SubscriptionId: subscription.id
    })
    return payment;
}
//DELETE PAYMENT

module.exports = {
    getUserPayments,
    getPayment,
    createPayment
}