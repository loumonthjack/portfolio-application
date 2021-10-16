const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../../config/keys");

// Load Input Validation
const validateLoginInput = require("../../../validation/login");

// Load User Model
const User = require("../../../models/User");
const { createUserSession } = require("../../functions/internal/session");

// @route POST user/login
// @desc Login User & Return JWT token
// @access Public
router.post("/", (req, res) => {
    // Form validation
    const { errors, isValid } = validateLoginInput(req.body);
  
    // Check validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
  
    const email = req.body.email;
    const password = req.body.password;
  
    // Find user by email
    User.findOne({ email }).then(user => {
      // Check if user exists
      if (!user) {
        return res.status(400).json({ message: "Email not found" });
      }
      // Check password
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          // User matched
          // Create JWT Payload 
          const payload = {
            id: user.id,
            name: user.name
          };
          // Sign token
          jwt.sign(
            payload,
            keys.secretOrKey,
            {
              expiresIn: 1800 
            },
            (err, token) => {
              createUserSession(user._id, token).then(session => {
                if(session._id){
                  res.json({
                    success: true,
                    token: token,
                    userId: user._id
                  });
                }else{
                  res.status(400).json({
                    message: 'User Already has Active Session.'
                  })
                }
            });
               
            }
          );
        } else {
          return res.status(400)
            .json({ message: "Password incorrect" });
          }
      });
    });
  });
module.exports = router;
