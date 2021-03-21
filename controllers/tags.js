const Tag = require('../models/Tag');

class TagController{
  size = 36;
  tags = [];
  questionId = '';
  constructor(tags, questionId){
    this.tags = tags;
    this.questionId = questionId;
  }
  async addTags(){
    let totalTagsSaved = 0;
    let self = this;
    this.tags.forEach(async function(tag){
      let z = await self.addQuestionIdInTag(tag);
      console.log(z)
      if(z['isSaved'] == true){
        console.log('Tag saved!')
        totalTagsSaved += 1;
      } else {
        console.log("Error occured in saving tag", tag);
      }
    })
    return {
      totalTagsSaved: totalTagsSaved,
      totalTags: this.tags.length
    }
  }
  async deleteTag(){
    
  }
  async getAllTags(){
    // let tags = await Tag.find().limit(this.size);
    // let totalTags = await Tag.find().count();
    // return {
    //   tags: tags,
    //   totalTags: totalTags
    // };
  }
  async addQuestionIdInTag(tag){
    // creating a new tag if not exists, if exists push the question id
    let update = {$push: { questions: this.questionId }, updatedAt: Date.now()};
    let options = {upsert: true, new: true, setDefaultsOnInsert: true, useFindAndModify: false};
    try{
      let z = await Tag.findOneAndUpdate({name:tag},update, options);
      return {
        isSaved: true
      }
    } catch(err) {
      console.log(err);
      return {
        isSaved: false
      }
    }  
  }
}

module.exports = TagController;