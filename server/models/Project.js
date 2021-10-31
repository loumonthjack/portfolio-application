const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  source: {
    type: String,
	  required: false
  },
  visit: {
    type: String,
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

module.exports = Project = mongoose.model('projects', ProjectSchema);