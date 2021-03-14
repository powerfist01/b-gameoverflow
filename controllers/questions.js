const Question = require('../models/Question')

class QuestionController {
  constructor(){
    
  }
  async getAllQuestions(){
    let res = await Question.find({}).sort({created_date: -1});
    console.log(res);
    return res;
  }
  async createQuestion(ques){
    let question = new Question(ques);
    let z = await question.save();
    console.log(z);
  }
  async deleteQuestion(){

  }
  async updateQuestion(){

  }
  async addTag(){

  }
}

module.exports = QuestionController;