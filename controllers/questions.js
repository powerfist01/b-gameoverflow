const Question = require('../models/Question')

class QuestionController {
  constructor(){
    
  }
  async getAllQuestions(){
    let res = await Question.find({}).sort({created_date: -1});
    console.log(res);
    return res;
  }
  async createQuestion(title, body, author){
    let newQues = new Question({
      title: title,
      body: body,
      author: author
    });
    console.log(newQues);
    try{
      let z = await newQues.save();
      return {
        isSaved: true,
        questionId: z._id
      };
    } catch(err){
      console.log('Error in saving the new question')
      return {
        isSaved: false,
        error: err
      }
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