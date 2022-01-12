const User = require('./User')
const Token = require('./VerificationToken')

const config = require('../../config/index');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const Mailer = require('../../utils/mailer/mailer');

class UserService {
    constructor() {

    }
    async getAllUsers() {
        let res = await User.find({}).sort({ createdAt: -1 });
        return res;
    }

    async checkIfUsernameExists(username){
        let res = await User.find({username: username});
        console.log(res);
        if(res.length){
            return {success: true, data: username, details: 'Entered username already exists!'};
        } else {
            return {success: true, data: username, details: 'Username is available!'};
        }
    }

    async checkIfEmailExists(email){
        let res = await User.find({email: email});
    }

    async registerNewUser(username, email, password) {

        try {
            let newUser = new User({
                username: username,
                email: email,
                password: password
            });
            let user = await newUser.save();

            let sentToken = this.sendTokenForEmailVerification(user.email);

            return { success: true, result: user };
        } catch (err) {
            console.log('User already exists!', err);
            return { success: false, error: err, result: 'Internal Server Error!' };
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
                return { success: true, token: await this.generateJWTForLogin(user) };
            } else {
                return { success: false, result: 'Password not matched.' };
            }
        } catch (err) {
            console.log('Error occured during logging!');
            return { success: false, error: err, result: 'Internal Server Error!' };
        }
    }

    async generateJWTForLogin(user) {

        try {
            let token = jwt.sign(user.toJSON(), config.secret, { expiresIn: '7d' });
            return token;
        } catch (err) {
            console.log('Error in generating the JWT token')
            return { success: false, error: err, result: 'Error occured in generating the token!' };
        }
    }

    async verifyEmailUserToken(token) {

        try {
            let doc_token = await Token.findOne({ token: token });
            if (!doc_token)
                return { success: false, type: 'not-verified', result: 'Unable to find a valid token. Token my have expired.' };

            let user = await User.findOne({ _id: doc_token._userId });
            if (!user)
                return { success: false, type: 'not-verified', result: 'Unable to find a user for this token.' };

            if (user.isVerified)
                return { success: false, type: 'already-verified', result: 'User has already been verified.' };
            user.isVerified = true;

            let savedUser = user.save();
            return { success: true, user: savedUser, result: 'The account has been verified.' };
        } catch (err) {
            console.log('Error in verifying the email!', err)
            return { success: false, error: err, result: 'Internal Server Error!' };
        }
    }

    async sendTokenForEmailVerification(email) {

        let user = await User.findOne({ email: email });
        if (!user)
            return { success: false, result: 'User not found!' };

        if (user.isVerified)
            return { success: false, type: 'already-verified', result: 'User has already been verified.' };

        let token = await this.generateTokenForEmailVerification(user);
        if (token.success) {
            let sendMail = await this.sendMailForEmailVerification(user, token.token);

            if (sendMail.success)
                return { success: true, result: 'Token sent via email!' };
            else
                return { success: false, result: 'Token not sent!' };
        } else {
            return { success: false, result: 'Error occured generating token for email verification!' };
        }
    }

    async generateTokenForEmailVerification(user) {
        try {
            const newToken = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            let token = await newToken.save();
            return { success: true, result: 'Generated the token!', token: token };
        } catch (err) {
            console.log('Error occured in generating crypto token for email verification');
            return { success: false, result: 'Internal Server Error!', error: err };
        }
    }

    async sendMailForEmailVerification(user, token) {
        try {
            let mailer = new Mailer();
            let mailed = await mailer.sendTokenVerificationMail(user, token);
            return { success: true, mail: mailed, result: 'Email sent!' };
        } catch (err) {
            console.log('Error in sending the email')
            return { success: false, result: 'Internal Server Error!', error: err };
        }
    }

    async deleteUser() {


    }
    async updateUser() {

    }
}

module.exports = UserService;