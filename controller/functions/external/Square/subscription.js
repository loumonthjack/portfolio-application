const {
    Client,
    Environment
} = require('square');
const User = require('../../../../models/User');
const Payment = require('../../../../models/Payment');

const { getUser } = require('../../internal/user');
const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

async function getSubscription(userId) {
    const user = await getUser(userId);
    const customer = await getCustomer(user._id)
}
// Get Catalog Subscripton PlanId, Get Price, Create Payment & Subscription
async function createSubscription(userId, data) {
    const user = await getUser(userId);
    const customer = await getCustomer(user._id);
}
// get Subscription
async function cancelSubscription(userId) {
    const subscription = getSubscription(userId)
}

module.exports = {
    getSubscription,
    createSubscription,
    cancelSubscription,
}