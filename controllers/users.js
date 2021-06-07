const User = require('../models/User')

class UserController {
  constructor(){
    
  }
  async getAllUsers(){
    let res = await User.find({}).sort({createdAt: -1});
    return res;
  }
  async registerUser(){
    
  }
  async loginUser(){

  }
  async deleteUser(){

  }
  async updateUser(){

  }
}

module.exports = UserController;