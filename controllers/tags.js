const TagService = require('../services/tags');
module.exports = {

  getAllTags: async (req,res,next) => {
    let t = new TagService();
    let data = await t.getAllTags();
    // data['totalPages'] = Math.ceil(data['totalTags']/36).toString();
    console.log(data)
    res.send(data);
  },
  getTagById: async (req,res,next) => {
    console.log(req);
    
    res.send("lol-questions")
  }
}