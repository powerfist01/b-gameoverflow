const Question = require('../models/Question')
const QuestionNumber = require('../models/QuestionNumber')

class QuestionService {
  constructor(){
    
  }
  async getAllQuestions(){
    let res = await Question.find({}).sort({createdAt: -1});
    return res;
  }
  async getQuestionCount(){
    let questionNumber = await QuestionNumber.findByIdAndUpdate('605ae0a4d0448e169830e526',{$inc: {questionNumber: 1}}, {useFindAndModify: false});

    if(questionNumber.length == 0){
      questionNumber = 1;
      let newQuestionNumber = new QuestionNumber({
        questionNumber: questionNumber
      })
      await newQuestionNumber.save();
    } else {
      questionNumber = questionNumber.questionNumber;
    }
    
    return questionNumber;
  }
  async createQuestion(title, body, tags, author){
    let questionNumber = await this.getQuestionCount();
    let newQuestion = new Question({
      title: title,
      body: body,
      questionNumber: questionNumber,
      author: author,
      tags: tags
    });
    try{
      let z = await newQuestion.save();
      return {
        isSaved: true,
        _id: z._id
      };
    } catch(err){
      console.log('Error in saving the new question', err)
      return {
        isSaved: false,
        error: err
      }
    }
    
  }
  async getQuestionByQuestionNumber(questionNumber){
    console.log(questionNumber);
    try{
      let question = await Question.find({questionNumber: questionNumber});
      console.log(question);
      return question;
    } catch(err){
      return {
        error: true
      }
    }

  }
  async deleteQuestion(){

  }
  async updateQuestion(){

  }
}

module.exports = QuestionService;
