const UserService = require('../services/users');
const jwt = require('jsonwebtoken');
// Load User model
const User = require('../models/User');
const config = require('../config/index');

module.exports = {
    register: async (req, res, next) => {
        const { username, email, password } = req.body;
        if (!username || !password || !email) {
            return res.status(400).send({ success: false, msg: 'Please provide valid !' })
        }
        let userService = new UserService();
        let createdUser = await userService.registerNewUser(req.body);
        if(createdUser.success == true){
            return res.json({success: true, msg: 'New User created!'})
        } else {
            return res.status(400).json({success: false, msg: 'User already exists.'})
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
                        let token = jwt.sign(user.toJSON(), config.secret, "Stack", {
                            expiresIn: '30d'
                        });
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
        User.find(function (err, users) {
            if (err) return next(err);
            res.json(users);
        });
    },
    logout: async (req, res) => {
        req.logout();
        res.json({ success: true, msg: 'Sign out successfully.' });
    }
}