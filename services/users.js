const User = require('../models/User')

const config = require('../config/index');
const jwt = require('jsonwebtoken');

class UserService {
    constructor() {

    }
    async getAllUsers() {
        try{
            let res = await User.find({}).sort({ createdAt: -1 });
            return res;
        } catch(err) {
            return { success: false, error: err };
        }
    }

    async registerNewUser(username, email, password) {

        try {
            let newUser = new User({
                username: username,
                email: email,
                password: password
            });
            let saveUser = await newUser.save();
            // console.log(saveUser);
            return { success: true, result: saveUser };
        } catch (err) {
            console.log('User already exists!');
            return { success: false, error: err };
        }
    }

    async loginUser(email, password) {

        try{
            let user = await User.findOne({ email: email });
            if (!user) {
                return { success: false, result: 'User not found!' };
            }
            let comparedPassword = await user.comparePassword(password);
            if(comparedPassword){
                let token = jwt.sign(user.toJSON(), config.secret, {expiresIn: '7d'});
                return { success: true, token: token };
            } else {
                return { success: false, result: 'Authentication failed.' };
            }
        } catch(err){
            console.log('Error occured during logging!');
            return { success: false, error: err , result: 'Error occured!'};
        }
    }

    async deleteUser() {


    }
    async updateUser() {

    }
}

module.exports = UserService;