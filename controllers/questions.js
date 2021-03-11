const Question = require('../models/Question')

class QuestionController {
  constructor(){
    
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
  async 
}

module.exports = QuestionController;