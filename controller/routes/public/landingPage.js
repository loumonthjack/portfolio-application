//navigate to sign in or sign up then send to admin/user
const express = require("express");
const router = express.Router();
const Price = require('./../../functions/internal/price');

router.get('/', async (req, res) => {
    try {
        const prices = await Price.getPrices();
        res.send({
            prices: prices
        })
    } catch (err) {
        return err
    }
})

module.exports = router;