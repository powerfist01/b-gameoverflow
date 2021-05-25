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
    User.findOne({username: req.body.username}, function (err, user) {
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
});

router.get('/get_all_users', passport.authenticate('jwt', { session: false}), async (req,res,next)=>{
    let token = getToken(req.headers);
    console.log(req.headers);
    if (token) {
        User.find(function (err, users) {
            if (err) return next(err);
            res.json(users);
        });
    } else {
        return res.status(403).send({success: false, msg: 'Unauthorized.'});
    }
})

// Logout
router.get('/logout', passport.authenticate('jwt', { session: false}), (req, res) => {
    req.logout();
    res.json({success: true, msg: 'Sign out successfully.'});
});

getToken = function (headers) {
    if (headers && headers.authorization) {
        let parted = headers.authorization.split(' ');
        if (parted.length === 2) {
            return parted[1];
        } else {
            return null;
        }
    } else {
        return null;
    }
};

module.exports = router;
