const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const WebsiteSchema = new mongoose.Schema({
  s3Url: {
    type: String,
    required: true
  },
  aliasUrl: {
    type: String,
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  }
});

module.exports = Website = mongoose.model('websites', WebsiteSchema);
