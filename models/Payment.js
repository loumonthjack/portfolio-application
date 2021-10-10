const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*
Ex.
Payment{
    payment_date: "2021-28-08-21:23:21",
    user_id: "876d3-243q2-654w2-3e324",
    price_id: "1332f-423rd-a3t2g-tg434", 
    source: "ccof:uIbfJXhXETSP197M3GB" -- card_id to retrieve card from square database
}
*/
// Create Schema
const PaymentSchema = new Schema({
  payment_date: {
    type: Date,
    default: Date.now
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  priceId: {
    type: Schema.Types.ObjectId,
    ref: "Price",
    required: true
  },
  SubscriptionId: {
    type: String,
    required:true
  }
});

module.exports = Payment = mongoose.model("payments", PaymentSchema);