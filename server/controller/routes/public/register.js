const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// Load input validation
const validateRegisterInput = require("../../../validation/register");

// Load User Model
const User = require("../../../models/User");

// @route POST user/register
// @desc Register User
// @access Public
router.post("/", (req, res) => {
  
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body); 

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({
    email: req.body.email
  }).then(user => {
    if (user) {
      return res.status(400).json({
        email: "Email already exists"
      });
    } else {
      const newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        role: "basic"
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json({
              id: user._id,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              role: user.role
            }))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
module.exports = router;