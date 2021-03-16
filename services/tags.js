const TagController = require('../controllers/tags');
module.exports = {

  getAllTags: async (req,res,next) => {
    let t = new TagController();
    console.log(req.params);
    console.log(req.query);
    let data = await t.getAllTags();
    data['totalPages'] = Math.ceil(data['totalTags']/36).toString();
    res.send(data);
  },
  getTagById: async (req,res,next) => {
    console.log(req);
    
    res.send("lol-questions")
  }
}