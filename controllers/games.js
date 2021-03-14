const Game = require('../models/Game')

class GameController {
  constructor(){
    // default constructor
  }
  async getAllGames(){
    let res = await Game.find({}).sort({created_date: -1});
    console.log(res);
    return res;
  }
  async addGame(gam){
    let game = new Game(gam);
    let z = await Game.save();
    console.log(z);
  }
  async deleteGame(){

  }
  async updateGame(){

  }
}

module.exports = GameController;