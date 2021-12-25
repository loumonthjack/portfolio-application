const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");

// Load Input Validation
const validateLoginInput = require("../../../validation/login");

// Load User Model
const User = require("../../../models/User");
const {
  createUserSession, getUserSession
} = require("../../functions/internal/session");

// @route POST user/login
// @desc Login User & Return JWT token
// @access Public
router.post("/", async (req, res) => {
  // Form validation
  const {
    errors,
    isValid
  } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Authenticate User using Passport Local Strategy

  const user = await User.findOne({
    email: email
  });
  const passwordIsValid = await bcrypt.compare(
    password,
    user.password
  );
  if (!user) {
    errors.email = "User not found";
    return res.status(404).json(errors);
  }
  if (!passwordIsValid) {
    errors.password = "Password incorrect";
    return res.status(400).json(errors);
  }
  if (passwordIsValid) {
    // User matched
    // Create JWT Payload 
    const payload = {
      id: user.id,
      name: user.name
    };
    // Sign token
    jwt.sign(
      payload,
      keys.secretOrKey, {
      expiresIn: 1800
    },
      (err, token) => {
        const session = createUserSession(user.id, token);
        if(!session) res.status(400).json({
          message: 'User Already has Active Session.'
        });
            res.json({
              success: true,
              token: token,
              userId: user._id
            });
        });
  } else {
    return res.status(400).json({
      message: "Password incorrect"
    });
  }
});
module.exports = router;