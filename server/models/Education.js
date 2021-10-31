const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const EducationSchema = new mongoose.Schema({
    schoolTitle: {
        type: String,
        required: true
    },
    studyField: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: false
    },
    state: {
        type: String,
        required: false
    },
    start_date: {
        type: Date,
        required: true
    },
    end_date: {
        type: Date,
        required: false
    },
    websiteId: {
        type: Schema.Types.ObjectId,
        ref: "Website",
        required: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
});

module.exports = Education = mongoose.model('educations', EducationSchema);