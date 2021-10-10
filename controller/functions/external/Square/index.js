const {
    Client,
    Environment
} = require('square');
const JSONBig = require('json-bigint');
const { uuid } = require('uuidv4');
const { getPrice } = require('../../internal/price');
const { getUser } = require('../../internal/user');
const { createPayment } = require('../../internal/payment');
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
        const customer = customers.filter(result => {return result.reference_id.includes(userId)})
        if(customer.length = 1) return customer && customer[0]
        else return 'Customer Does Not Exist in Square'
    } catch (err) {
        return err
    }
};

async function createCustomer(userId) {
    try {
        const user = await getUser(userId);
        const customer = await getCustomer(userId)
        if ((customer != undefined) && (customer.reference_id == user[0].id)) {
            return JSONBig.parse(JSONBig.stringify(customer))
        } else {
            const newCustomer = await client.customersApi.createCustomer({
                givenName: `${user[0].firstName}`,
                familyName: `${user[0].lastName}`,
                emailAddress: `${user[0].email}`,
                referenceId: `${userId}`
            })
            return JSONBig.parse(JSONBig.stringify(newCustomer.result.customer))
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
        if (customer != undefined) {
            const customerCards = await getCustomerCard(customer.reference_id);
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
                return JSONBig.parse(JSONBig.stringify(newCustomerCard));
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
            return JSONBig.parse(JSONBig.stringify(newCustomerCard));
        }
    } catch (err) {
        return err
    }
};

async function disableCustomerCard(userId) {}

async function getPriceTypes() {
    const response = await client.catalogApi.searchCatalogObjects({
        objectTypes: [
            'SUBSCRIPTION_PLAN'
        ]
    });
    const result = JSON.parse(response.body);
    return result.objects
}

async function deletePriceType() {
    try {
        const response = await client.catalogApi.deleteCatalogObject('');
        console.log(response.result);
        return response.result
      } catch(error) {
        console.log(error);
      }
}

/*
async function createPriceType() {
    const newCatalog = await client.catalogApi.upsertCatalogObject({
        idempotencyKey: uuid(),
        object: {
          type: 'SUBSCRIPTION_PLAN',
          id: "#plan",
          subscriptionPlanData: {
              name: 'Premium Yearly',
              phases: [
                {
                  cadence: 'ANNUAL',
                  periods: 5,
                  recurringPriceMoney: {
                    amount: 6000,
                    currency: 'USD'
                  }
                }
            ]
          }
        }
      });
      return newCatalog.result.catalogObject;
}
*/

async function createSubscription(userId, data){
    try {
        const customer = await getCustomer(userId);
        const customerCard = await getCustomerCard(userId);
        const prices = await getPrice(data.access);
        const price = prices.filter(result => result.type == data.type);
        // Monthly Plus
        const response = await client.subscriptionsApi.createSubscription({
          idempotencyKey: uuid(),
          locationId: 'LYJ2ZZXCZ1QZ0',
          planId: price[0].CatalogId,
          customerId: `${customer.id}`,
          cardId: `${customerCard[0].id}`
        });
      
        const result = JSONBig.parse(JSONBig.stringify(response))
        if(result.statusCode == 200){ 
            const payment =  await createPayment(userId, result.result.subscription);
            return {subscription: result.result.subscription, paymentId: payment.id}
        }else{
            return result.status(400).json({message: "Could Not Process Payment"})
        }
      } catch(error) {
        console.log(error);
      }

}

async function cancelSubscription(subscriptionId){
    try {
        const response = await client.subscriptionsApi.cancelSubscription(subscriptionId);
        const result = JSONBig.parse(JSONBig.stringify(response))
        return result.result;
      } catch(error) {
        console.log(error);
      }

}
async function getSubscriptions(userId){
    try {
        const customer = await getCustomer(userId);
        const subscriptions = await client.subscriptionsApi.searchSubscriptions({
            query: {
              filter: {
                customerIds: [
                  `${customer.id}`
                ],
                locationIds: [
                  'LYJ2ZZXCZ1QZ0'
                ]
              }
            }
          });
          const response = JSONBig.parse(JSONBig.stringify(subscriptions))
        return response.result;
    } catch (error) {
        return error
    }
}


module.exports = {
    getAllCustomers,
    getPriceTypes,
    //createPriceType,
    deletePriceType,
    getCustomer,
    createCustomer,
    disableCustomerCard,
    createNewCustomerCard,
    getCustomerCard,
    createSubscription,
    cancelSubscription,
    getSubscriptions
}