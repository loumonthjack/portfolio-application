const {
    Client,
    Environment
} = require('square');
const JSONBig = require('json-bigint')
const client = new Client({
    environment: Environment.Sandbox,
    accessToken: process.env.SQUARE_ACCESS_TOKEN
});

// SQUARE FUNCTIONS
async function getAllCustomers() {
    try {
        const clients = await client.customersApi.listCustomers();
        const result = JSON.parse(clients.body);
        return result.customers
    } catch (err) {
        return err
    }
};

async function getCustomer(userId) {
    try {
        const customers = await getAllCustomers();
        return customers && customers.filter(result => result.reference_id.includes(userId)) && customers[0]
    } catch (err) {
        return err
    }
};

async function createCustomer(userId) {
    try {
        const customer = await getCustomer(userId)
        if (customer) {
            return JSONBig.parse(JSONBig.stringify(customer))
        } else {
            const newCustomer = await client.customersApi.createCustomer({
                givenName: `${user[0].firstName}`,
                familyName: `${user[0].lastName}`,
                emailAddress: `${user[0].email}`,
                referenceId: `${userId}`
            })
            return newCustomer.result.customer
        }
    } catch (err) {
        return err
    }
};


async function getCustomerCard(userId) {
    try {
        const customer = await getCustomer(userId);
        const cards = await client.cardsApi.listCards();
        const result = JSON.parse(cards.body);
        const customerCards = result.cards.filter(result => result.customer_id.includes(customer.id));
        return customerCards && customerCards
    } catch (error) {
        return error
    }
};

async function createNewCustomerCard(userId, data) {
    try {
        const customer = await getCustomer(userId);
        if (customer) {
            const customerCards = await getCustomerCard(userId);
            if (customerCards.length < 4) {
                const newCustomerCard = await client.customersApi.createCustomerCard(customer.id, {
                    cardNonce: data.card_nonce,
                    billingAddress: {
                        addressLine1: '500 Electric Ave',
                        addressLine2: 'Suite 600',
                        locality: 'New York',
                        administrativeDistrictLevel1: 'NY',
                        postalCode: '12345',
                        country: 'US'
                    },
                    cardholderName: 'Amelia Earhart'
                })
                return newCustomerCard;
            } else return 'Card Limit Reached. Please Delete Old Card!';
        } else {
            const createNewCustomer = await createCustomer(userId);
            const newCustomerCard = await client.customersApi.createCustomerCard(createNewCustomer.id, {
                cardNonce: data.card_nonce,
                billingAddress: {
                    addressLine1: '500 Electric Ave',
                    addressLine2: 'Suite 600',
                    locality: 'New York',
                    administrativeDistrictLevel1: 'NY',
                    postalCode: '12345',
                    country: 'US'
                },
                cardholderName: 'Amelia Earhart'
            })
            return newCustomerCard;
        }
    } catch (err) {
        return err
    }
};

async function disableCustomerCard(userId) {}

async function getPriceTypes() {
    const response = await client.catalogApi.searchCatalogObjects({
        objectTypes: [
            'ITEM'
        ]
    });
    const result = JSON.parse(response.body);
    return result.objects
}

async function getPlusPriceTypes() {
    const response = await getPriceTypes();
    return response && response.filter(result => result.item_data.name == 'Plus')
}

async function getPremiumPriceTypes() {
    const response = await getPriceTypes();
    return response && response.filter(result => result.item_data.name == 'Premium')
}

/*
async function createPriceType() {
    const newCatalog = await client.catalogApi.upsertCatalogObject({
        idempotencyKey: uuid(),
        object: {
          type: 'ITEM',
          id: "#premium",
          itemData: {
            name: 'Premium',
            description: 'Premium Subcription Type',
            abbreviation: 'PR',
            variations: [
              {
                type: 'ITEM_VARIATION',
                id: '#monthly',
                itemVariationData: {
                    itemId: "#premium",
                    name: 'Monthly',
                    pricingType: 'FIXED_PRICING',
                    priceMoney: {
                      amount: 6,
                      currency: 'USD'
                    }
                  }
              },
              {
                type: 'ITEM_VARIATION',
                id: '#yearly',
                itemVariationData: {
                  itemId: "#premium",
                  name: 'Yearly',
                  pricingType: 'FIXED_PRICING',
                  priceMoney: {
                    amount: 50,
                    currency: 'USD'
                  }
                }
              }
            ]
          }
        }
      });
      return newCatalog.result.catalogObject;
}
*/




module.exports = {
    getAllCustomers,
    getPriceTypes,
    getPlusPriceTypes,
    getPremiumPriceTypes,
    //  createPriceType,
    getCustomer,
    createCustomer,
    disableCustomerCard,
    createNewCustomerCard,
    getCustomerCard
}