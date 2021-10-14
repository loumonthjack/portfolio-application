const express = require("express");
const router = express.Router();
const { getUser, updateUserRole }= require("../../functions/internal/user");
const Square = require('../../functions/external/Square/index')
const Price = require("./../../functions/internal/price");
const Payment = require("./../../functions/internal/payment");
const {
    logEvent
} = require("./../../logger");

router.get('/square/customers', async (req, res) => {
    try {
        const customers = await Square.getAllCustomers();
        logEvent(req, res);
        return res.send(customers)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.get('/:user_id/customer', async (req, res) => {
    try {
        const user = req.params.user_id;
        const customer = await Square.getCustomer(user);
        logEvent(req, res);
        return res.send(customer)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})
router.post('/:user_id/customer', async (req, res) => {
    try {
        const user = req.params.user_id;
        logEvent(req, res);
        const newCustomer = await Square.createCustomer(user);
        return res.send(newCustomer)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})
router.get('/:user_id/customer/card', async (req, res) => {
    try {
        const user = req.params.user_id;
        const customerCard = await Square.getCustomerCard(user);
        logEvent(req, res);
        return res.send(customerCard)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.post('/:user_id/customer/card', async (req, res) => {
    try {
        const user = req.params.user_id;
        const newCustomerCard = await Square.createNewCustomerCard(user, req.body);
        logEvent(req, res);
        return res.send(newCustomerCard)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.get('/square/prices', async (req, res) => {
    try {
        const catalogs = await Square.getPriceByTypeTypes();
        logEvent(req, res);
        return res.send(catalogs);
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

/*
router.post('/square/price', async(req, res) => {
    const catalogs = await Square.createPriceType();
    return res.send(catalogs);
})
*/

router.delete('/square/price', async (req, res) => {
    try {
        const catalogs = await Square.deletePriceType();
        logEvent(req, res);
        return res.send(catalogs);
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.post('/square/:user_id/subscription', async (req, res) => {
    try {
        const user = req.params.user_id;
        const subscription = await Square.createSubscription(user, req.body);
        logEvent(req, res);
        return res.send(subscription);
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})
router.put('/square/:user_id/subscription/:subscription_id', async (req, res) => {
    try {
        const subscriptionId = req.params.subscription_id;
        const subscription = await Square.cancelSubscription(subscriptionId);
        logEvent(req, res);
        return res.send(subscription);
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.get('/square/:user_id/subscriptions', async (req, res) => {
    try {
        const user = req.params.user_id;
        const subscriptions = await Square.getSubscriptions(user);
        logEvent(req, res);
        return res.send(subscriptions);
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.get('/portfolio/prices', async (req, res) => {
    try {
        const allPrices = await Price.getPrices();
        logEvent(req, res);
        return res.send({
            prices: allPrices
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.get('/prices/:type', async (req, res) => {
    try {
        const type = req.params.type;
        const prices = await Price.getPriceByType(type);
        logEvent(req, res);
        return res.send({
            price: prices
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})

router.delete('/:price_id/price', async (req, res) => {
    try {
        const priceId = req.params.price_id;
        const prices = await Price.deletePrice(priceId);
        logEvent(req, res);
        return res.send(prices)
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

/*
router.post('/price', async (req, res) => {
    try {
        const newPrice = await Price.createPrice();
        return res.send(newPrice)
    } catch (err) {
        return res.status(400).json({message: err})
    }
});
*/


router.get('/:user_id/payments', async (req, res) => {
    try {
        const userId = req.params.user_id;
        const payments = await Payment.getUserPayments(userId);
        logEvent(req, res);
        return res.send({
            payments: payments
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});
router.get('/:user_id/payment/:payment_id', async (req, res) => {
    try {
        const paymentId = req.params.payment_id;
        const payment = await Payment.getPayment(paymentId);
        logEvent(req, res);
        return res.send(payment[0])
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
});

router.post('/:user_id/payment', async (req, res) => {
    try {
        const userId = req.params.user_id;
        const subscription = await Square.createSubscription(userId, req.body);
        const payment = await Payment.getPayment(subscription.paymentId);
        const price = await Price.getPriceById(payment[0].priceId)
        const userRole = await getUser(userId)
        (userRole.role != price.access) && await updateUserRole(userId, price.access) 
        logEvent(req, res);
        return res.send({
            payment: payment[0]
        })
    } catch (err) {
        logEvent(req, res, err);
        return res.status(400).json({
            message: err
        })
    }
})
module.exports = router;