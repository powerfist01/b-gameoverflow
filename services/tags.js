const TagController = require('../controllers/tags');
module.exports = {

  getAllTags: async (req,res,next) => {
    let t = new TagController();
    console.log("This is me here");
    let data = await t.getAllTags();
    console.log(data);
    res.send(data);
  },
  getTagById: async (req,res,next) => {
    console.log(req);
    
    res.send("lol-questions")
  }
}