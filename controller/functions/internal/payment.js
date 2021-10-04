const Payment = require("../../../models/Payment");

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
//DELETE PAYMENT

module.exports = {
    getUserPayments,
    getPayment
}