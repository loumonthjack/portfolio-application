require('dotenv').config();
module.exports = {
  mongoURI: "'mongodb://localhost:27017/myresumeapp'",
  secretOrKey: process.env.MONGO_DB_SECRET_KEY
};
