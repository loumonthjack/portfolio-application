const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/*
Ex: 
Profile{
    picture: "profile.io/static/profile_pics/username.png",
    phone_number:"225-333-6402",
    address: "1200 Robley Dr. Dallas TX, 75287",
    user_id: User.id
} 

*/
// Create Schema
const ProfileSchema = new Schema({
    phoneNumber: {
        type: String,
        required: false
    },
    picture: {
        type: String,
        required: false
    },
    address: {
        type: String,
        required: false
    },
    creation_date: {
        type: Date,
        default: Date.now
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = Profile = mongoose.model("profiles", ProfileSchema);