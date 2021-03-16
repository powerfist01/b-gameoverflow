module.exports = {
  getAllGames: async (req,res,next) => {
    let promise = new Promise(function(resolve, reject){
      setTimeout(() => {
        resolve("SUjeet is good boy");
      }, 5000);
    })
    promise.then(function(data){
      res.send(data);
    })
    .catch(function(err){
      res.send(err);
    })
  },
  getGameById: async (req,res,next) => {
    console.log(req);
    
    res.send("lol-questions")
  },
  addGame: async (req,res,next) => {
    console.log(req);
    
    res.send("lol-questions")
  }
}