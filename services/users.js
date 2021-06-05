const UserController = require('../controllers/users');
const jwt = require('jsonwebtoken');
// Load User model
const User = require('../models/User');
const config = require('../config/index');


module.exports = {
    register: async (req, res, next) => {
        const { username, email, password, password2 } = req.body;
        console.log(req.body);
        console.log(username, email, password, password2);
        if (password != password2) {
            return res.status(400).send({ success: false, msg: 'Password not match.' });
        }
        if (!username || !password) {
            return res.status(404).send({ success: false, msg: 'Please pass username and password.' })
        } else {
            let newUser = new User({
                username,
                password,
                email
            });
            // save the user
            newUser.save(function (err) {
                if (err) {
                    return res.status(400).send('User already exists.')
                }
                return res.json({ success: true, msg: 'Successful created new user.' });
            });
        }
    },
    login: async (req, res, next) => {
        User.findOne({ username: req.body.username }, function (err, user) {
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
    },

    getAllUsers: async (req, res, next) => {
        let token = getToken(req.headers);
        console.log(req.headers);
        if (token) {
            User.find(function (err, users) {
                if (err) return next(err);
                res.json(users);
            });
        } else {
            return res.status(403).send({ success: false, msg: 'Unauthorized.' });
        }
    },
    logout: async (req, res) => {
        req.logout();
        res.json({ success: true, msg: 'Sign out successfully.' });
    },
    getToken : async (headers) => {
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
    }
}