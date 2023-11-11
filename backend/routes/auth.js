const secret_key = require('../secret')
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchUser = require('../middleware/fetchUser');

const jwtSecret = secret_key;

// Route 1: Create a user using POST "/api/auth/createuser", doesn't require authentication

router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password must have a minimum of 5 characters').isLength({ min: 5 }),
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  try {
    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    const user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPassword
    });
    const data = {user: {id: user.id}}
    const authToken = jwt.sign(data, jwtSecret);
    // res.json(user);
    success = true;
    res.json({success, authToken});

  } catch (error) {
    if (error.code === 11000) {
      // Duplicate key error
      return res.status(400).json({ success, error: 'Email already exists' });
    }
    console.error(error);
    res.status(500).json({ success, error: 'Server error' });
  }
});

// Route 2: Authenticte a user using POST "/api/auth/login", doesn't require authentication

router.post('/login', [
  body('email', "Enter a valid Email").isEmail(),
  body('password', 'Password cannot be blank').exists()
], async (req, res) => {
  let success = false;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success, errors: errors.array() });
  }
  const {email, password} = req.body;
  try {
    let user = await User.findOne({email});
    if (!user) return res.status(400).json({ success, errors: 'Invalid login credentials' });
    const cmp = await bcrypt.compare(password, user.password);
    if (!cmp) return res.status(400).json({ success, errors: 'Invalid login credentials' });
    const data = {user: {id: user.id}}
    const authToken = jwt.sign(data, jwtSecret);
    success = true;
    res.json({success, authToken});

  } catch (error) {
     console.error({success, error});
  }
});

// Route 3: Get details of loggedin user using POST "/api/auth/getuser"

router.post('/getuser', fetchUser, async (req, res) => {
  let success = false;
  try {
    userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    success = true;
    res.send({success, user});

  } catch (error) {
     console.error({success, error});
  }
});

module.exports = router;