const { getPriceById } = require('../functions/internal/price')
const { getUserPayments } = require('../functions/internal/payment')
const { updateUserRole, getUser } = require("../functions/internal/user");
const { _ } = require('lodash')

const updateAccess = async (req, res, next) => {
    const userId = req.params.user_id;
    const user = await getUser(userId);
    const userPayments = await getUserPayments(user.id);
    const monthlyAccess = "monthly";
    const yearlyAccess = "yearly";
    const basicUser = "basic";
    if (_.isEmpty(userPayments)) {
        return
    };
    const lastPayment = userPayments.slice(-1)[0];
    const payment = await getPriceById(lastPayment.priceId);
    if (lastPayment) {
        const lastPaymentDate = lastPayment.payment_date.getTime();
        const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
        const expiration = diffDays(new Date().getTime(), lastPaymentDate);
        const monthExpired = (expiration > 31);
        const yearExpired = (expiration > 366);
        if (user.role == basicUser) {
            const updateUser = await updateUserRole(user.id, payment.access);
            if (payment.type == monthlyAccess) {
                (monthExpired == false) && updateUser
                return
            } else if (payment.type == yearlyAccess) {
                (yearExpired == false) && updateUser
                return
            };
        } else {
            const updateUser = await updateUserRole(user.id, basicUser);
            if (payment.type == monthlyAccess) {
                (monthExpired == false) && updateUser
                return
            } else if (payment.type == yearlyAccess) {
                (yearExpired == false) && updateUser
                return
            };
        };
    };
    next()
}

module.exports = {
    updateAccess
}