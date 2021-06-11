const User = require('../models/User')
const Token = require('../models/VerificationToken')

const config = require('../config/index');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Mailer = require('../utils/mailer/mailer');

class UserService {
    constructor() {

    }
    async getAllUsers() {
        try {
            let res = await User.find({}).sort({ createdAt: -1 });
            return res;
        } catch (err) {
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
            let savedUser = await newUser.save();
            // console.log(savedUser);
            let token = new Token({ _userId: savedUser._id, token: crypto.randomBytes(16).toString('hex') });
            // console.log(token);
            let savedToken = await token.save();
            let mailer = new Mailer();
            mailer.sendTokenVerificationMail(savedUser, savedToken);
            return { success: true, result: savedUser, token: savedToken };
        } catch (err) {
            console.log('User already exists!', err);
            return { success: false, error: err, result: 'Error occured!' };
        }
    }

    async loginUser(email, password) {

        try {
            let user = await User.findOne({ email: email });
            if (!user) {
                return { success: false, result: 'User not found!' };
            }
            let comparedPassword = await user.comparePassword(password);
            if (comparedPassword) {
                return { success: true, token: await this.generateJwtToken(user) };
            } else {
                return { success: false, result: 'Password not matched.' };
            }
        } catch (err) {
            console.log('Error occured during logging!');
            return { success: false, error: err, result: 'Error occured!' };
        }
    }

    async generateJwtToken(user) {

        try {
            let token = jwt.sign(user.toJSON(), config.secret, { expiresIn: '7d' });
            return token;
        } catch (err) {
            console.log('Error in generating the JWT token')
            return { success: false, error: err, result: 'Error occured in generating the token!' };
        }
    }

    async verifyUserToken(token) {

        try {
            let doc_token = await Token.findOne({token: token});
            if(!doc_token)
                return { success:false, type: 'not-verified', result: 'Unable to find a valid token. Token my have expired.' };
            
            let user = await User.findOne({_id: doc_token._userId});
            if (!user)
                return { success:false, type: 'not-verified', result: 'Unable to find a user for this token.' };

            if (user.isVerified)
                return { success:false, type: 'already-verified', result: 'User has already been verified.' };
            user.isVerified = true;

            let savedUser = user.save();
            return { success: true, user: savedUser, result: 'The account has been verified.' };
        } catch (err) {
            console.log('Error in verifying the email!', err)
            return { success: false, error: err, result: 'Error in verifying the email!' };
        }
    }

    async deleteUser() {


    }
    async updateUser() {

    }
}

module.exports = UserService;