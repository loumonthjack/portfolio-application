const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*
Ex: 
Price{
    amount:"$5.99",
    access:"premium+",
    type: "monthly"
} 
Should be only 4 Price Objects.
Should have two accessible apis -> getPriceById and getPrices
Prices
{
    access:"plus", 
    type:"monthly",
    subscription:"GPOKJPTV2KDLVKCADJ7I77EF"
},
{
    access:"plus", 
    type:"yearly",
    subscription:"GPOKJPTV2KDLVKCADJ7I77EK"
},
{
    access:"premium", 
    type:"monthly",
    subscription: "GPOKJPTV2KDLVKCADJ7I77EJ"
},
{
    access:"premium", 
    type:"yearly"
    subscription: "GPOKJPTV2KDLVKCADJ7I77EZ"
}
*/
// Create Schema
const PriceSchema = new Schema({
    access: {
        type: String,
        enum: ["plus", "premium"],
        required: true
    },
    type: {
        type: String,
        enum: ["monthly", "yearly"],
        required: true
    },
    subscriptionSQ: {
        type: String,
        required: true
    }
});

module.exports = Price = mongoose.model("prices", PriceSchema);