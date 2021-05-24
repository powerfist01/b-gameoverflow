const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Load User model
const User = require('../models/User');
const config = require('../config/index');

// Register
router.post('/register', (req, res, next) => {
    //   const { username, email, password, password2 } = req.body;
    //   console.log(req.body);

    //   User.findOne({ email: email }).then(user => {
    //     if (user) {
    //       res.status(400).send({ msg: 'Email already exists' })
    //     } else {
    //       const newUser = new User({
    //         username,
    //         email,
    //         password
    //       });
// 
    //       bcrypt.genSalt(10, (err, salt) => {
    //         bcrypt.hash(newUser.password, salt, (err, hash) => {
    //           if (err) throw err;
    //           newUser.password = hash;
    //           newUser
    //             .save()
    //             .then(user => {
    //               console.log('User is saved', user);
    //               res.status(201).send('User created!')
    //             })
    //             .catch(err => console.log(err));
    //         });
    //       });
    //     }
    //   });
    const { username, email, password, password2 } = req.body;
    if (!username || !password) {
        res.json({ success: false, msg: 'Please pass username and password.' });
    } else {
        let newUser = new User({
            username,
            password,
            email
        });
        // save the user
        newUser.save(function (err) {
            if (err) {
                console.log(err);
                return res.json({ success: false, msg: 'Username already exists.' });
            }
            res.json({ success: true, msg: 'Successful created new user.' });
        });
    }
});

router.post('/login', async (req, res, next) => {
    // passport.authenticate('local', async (err, user, info) => {
    //     try {
    //         if (err || !user) {
    //             const error = new Error('An error occurred.');

    //             return next(error);
    //         }

    //         req.login(user, { session: false }, async (error) => {
    //             if (error) return next(error);

    //             const body = { _id: user._id, email: user.email };
    //             const token = jwt.sign({ user: body }, 'TOP_SECRET');

    //             return res.json({ token });
    //         }
    //         );
    //     } catch (error) {
    //         console.log("this is an error", error)
    //         return next(error);
    //     }
    // }
    // )(req, res, next);
    User.findOne({
        username: req.body.username
    }, function (err, user) {
        if (err) throw err;

        if (!user) {
            res.status(401).send({ success: false, msg: 'Authentication failed. User not found.' });
        } else {
            // check if password matches
            user.comparePassword(req.body.password, function (err, isMatch) {
                if (isMatch && !err) {
                    // if user is found and password is right create a token
                    let token = jwt.sign(user.toJSON(), config.secret);
                    // return the information including token as JSON
                    res.json({ success: true, token: 'JWT ' + token });
                } else {
                    res.status(401).send({ success: false, msg: 'Authentication failed. Wrong password.' });
                }
            });
        }
    });
}
);


// Logout
router.get('/logout', passport.authenticate('jwt', { session: false}), (req, res) => {
    req.logout();
    res.json({success: true, msg: 'Sign out successfully.'});
});

module.exports = router;
