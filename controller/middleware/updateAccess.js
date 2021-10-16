const { getPriceById } = require('../functions/internal/price')
const { getUserPayments } = require('../functions/internal/payment')
const { updateUserRole, getUser } = require("../functions/internal/user");
const { _ } = require('lodash')

const updateAccess = (req, res, next) => {
    const userId = req.params.user_id;
    getUser(userId).then(user => {
        if (user.role == 'basic') // upgrade access
            getUserPayments(user.id).then(userPayments => {
                const noPayments = _.isEmpty(userPayments);
                if (noPayments == true) {
                    return
                }
                const lastPayment = userPayments.slice(-1)[0]
                lastPayment && getPriceById(lastPayment.priceId).then(payment => {
                    const lastPaymentDate = lastPayment.payment_date.getTime();
                    const today = new Date().getTime();
                    const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
                    const expiration = diffDays(today, lastPaymentDate);
                    const monthExpired = (expiration > 31);
                    const yearExpired = (expiration > 366);
                    if (payment.type == "monthly") {
                        (monthExpired == false) && updateUserRole(user.id, payment.access).then(result => {
                            return
                        });
                    } else if (payment.type == "yearly") {
                        (yearExpired == false) && updateUserRole(user.id, payment.access).then(result => {
                            return
                        });
                    };
                });
            });
        else // downgrade access
            getUserPayments(userId).then(userPayments => {
                const noPayments = _.isEmpty(userPayments);
                if (noPayments == true) {
                    return
                }
                const lastPayment = userPayments.slice(-1)[0];
                lastPayment && getPriceById(lastPayment.priceId).then(payment => {
                    const lastPaymentDate = lastPayment.payment_date.getTime();
                    const today = new Date().getTime();
                    const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
                    const expiration = diffDays(today, lastPaymentDate);
                    console.log(expiration)
                    const monthExpired = (expiration > 31);
                    const yearExpired = (expiration > 366);
                    if (payment.type == "monthly") {
                        (monthExpired == true) && updateUserRole(user.id, 'basic').then(result => {
                            return
                        })
                    } else if (payment.type == "yearly") {
                        (yearExpired == true) && updateUserRole(user.id, 'basic').then(result => {
                            return
                        })
                    }
                });
            });
    });
    next()
}

module.exports = {
    updateAccess
}