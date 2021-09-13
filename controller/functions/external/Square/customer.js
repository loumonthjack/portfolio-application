const {
    Client,
    Environment
} = require('square');
const User = require('../../../../portfolio-application/models/User');
const { getUser } = require('../../internal/user');
const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
});


// STRIPE FUNCTIONS
async function getAllCustomers() {
    try {
        const clients = await client.customersApi.listCustomers();
        const result = JSON.parse(clients.body);
        const customers = result.customers;
        return customers
    } catch (err) {
        return err
    }
};

async function getCustomer(userId) {
    try {
        const clients = await client.customersApi.listCustomers();
        const result = JSON.parse(clients.body);
        const customers = result.customers;
        const customer = customers.map(customer => {
            if (customer.reference_id == userId) {
                return customer
            }
        })
        return customer
    } catch (err) {
        return err
    }
};

async function createCustomer(userId) {
    try {
        const user = await getUser(userId);
        const customer = await getCustomer(user._id)
        if (customer) {
            return JSONBig.parse(JSONBig.stringify(customer))
        } else {
            const newCustomer = client.customersApi.createCustomer({
                givenName: `${user.first_name}`,
                familyName: `${user.last_name}`,
                emailAddress: `${user.email}`,
                referenceId: `${user._id}`
            })
            return JSONBig.parse(JSONBig.stringify(newCustomer))
        }
    } catch (err) {
        return err
    }
};

async function getCustomerCard(userId) {
    try {
        const user = await getUser(userId);
        const customer = await getCustomer(user._id);
        const cards = await client.cardsApi.listCards();
        const result = JSON.parse(cards.body)
        const everyCard = result.cards;
        const customerCards = everyCard.map(card => {
            if (card.customer_id == customer.id) {
                return card
            }
        })
        return customerCards
    } catch (error) {
        return error
    }
};


async function createCustomerCard(userId) {}
async function disableCustomerCard(userId) {}

async function getSubscription(userId) {}
async function createSubscription(userId) {}
async function cancelSubscription(userId) {}


module.exports = {
    getAllCustomers,
    getCustomer,
    getCustomerCard,
    getSubscription,
    createCustomer,
    createCustomerCard,
    createSubscription,
    disableCustomerCard,
    cancelSubscription
}