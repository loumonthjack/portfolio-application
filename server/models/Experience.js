const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ExperienceSchema = new mongoose.Schema({
    jobTitle: {
      type: String,
      required: true
    },
    employer: {
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
    websiteId:{
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
  
  module.exports = Experience = mongoose.model('experiences', ExperienceSchema);