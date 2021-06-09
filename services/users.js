const User = require('../models/User')

class UserService {
    constructor() {

    }
    async getAllUsers() {
        let res = await User.find({}).sort({ createdAt: -1 });
        return res;
    }
    async registerNewUser(user) {
        try{
            let newUser = new User(user);
            // save the user
            let saveUser = await newUser.save();
            return { success: true, result: saveUser };
        } catch(err) {
            console.log('User already exists!');
            return { success: false, error: err };
        }
    }
    async loginUser() {

    }
    async deleteUser() {

    }
    async updateUser() {

    }
}

module.exports = UserService;