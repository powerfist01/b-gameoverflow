const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
// Load User model
const User = require('../models/User');

// Register
router.post('/register', (req, res) => {
  const { username, email, password, password2 } = req.body;
  console.log(req.body);

  User.findOne({ email: email }).then(user => {
    if (user) {
      res.status(400).send({ msg: 'Email already exists' })
    } else {
      const newUser = new User({
        username,
        email,
        password
      });

      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => {
              console.log('User is saved', user);
              res.status(201).send('User created!')
            })
            .catch(err => console.log(err));
        });
      });
    }
  });
});

// Login
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login'
  })(req, res, next);
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
});

module.exports = router;
