const Tag = require('../models/Tag');

class TagController{
  async createTag(tag){
    console.log(tag);
    let t = new Tag({
      name: tag
    })
    console.log(t);
    let z = await t.save();
    console.log(z)
  }
  async deleteTag(){
    let z = await Tag.deleteOne({name: "pubg"});
    console.log(z);
  }
  async updateTag(name, question){
    let z = await Tag.updateOne({name: name},{$push: {question_ids: question}});
    console.log(z)
  }
}

module.exports = TagController;