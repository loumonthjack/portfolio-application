const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const SessionSchema = new Schema({
    token: {
        type: String,
        required: true
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

module.exports = Session = mongoose.model("sessions", SessionSchema);