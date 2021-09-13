const {
    Client,
    Environment
} = require('square');
const User = require('../../../../models/User');
const { getUser } = require('../../internal/user');
const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
});

async function getSubscription(userId) {
    const user = await getUser(userId);
    const customer = await getCustomer(user._id)
}
async function createSubscription(userId) {
    const user = await getUser(userId);
    const customer = await getCustomer(user._id);
}
async function cancelSubscription(userId) {
    const user = await getUser(userId);
    const customer = await getCustomer(user._id);
}

module.exports = {
    getSubscription,
    createSubscription,
    cancelSubscription,
}