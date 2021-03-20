const Question = require('../models/Question')

class QuestionController {
  constructor(){
    
  }
  async getAllQuestions(){
    let res = await Question.find({}).sort({created_date: -1});
    console.log(res);
    return res;
  }
  async createQuestion(title, body){
    let newQues = new Question({
      title: title,
      body: body,
      author: 'sujeet'
    });
    try{
      let z = await newQues.save();
      console.log(z);
      return z;
    } catch(err){
      console.log(err);
      return 404;
    }
    
  }
  async deleteQuestion(){

  }
  async updateQuestion(){

  }
  async addTag(){

  }
}

module.exports = QuestionController;