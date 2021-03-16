const Tag = require('../models/Tag');

class TagController{
  limit = 36;
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
  async getAllTags(){
    let tags = await Tag.find().limit(this.limit);
    let totalTags = await Tag.find().count();
    return {
      tags: tags,
      totalTags: totalTags
    };
  }
}

module.exports = TagController;