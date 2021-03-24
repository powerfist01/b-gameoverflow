const Question = require('../models/Question')
const QuestionCounter = require('../models/QuestionCounter')

class QuestionController {
  constructor(){
    
  }
  async getAllQuestions(){
    let res = await Question.find({}).sort({createdAt: -1});
    return res;
  }
  async getQuestionCount(){
    let counter = await QuestionCounter.findByIdAndUpdate('605ae0a4d0448e169830e526',{$inc: {counter: 1}}, {useFindAndModify: false});
    if(counter.length == 0){
      counter = 1;
      let newCounter = new QuestionCounter({
        counter: counter
      })
      let y = await newCounter.save();
    } else {
      counter = counter.counter;
    }
    return counter;
  }
  async createQuestion(title, body, tags, author){
    let counter = await this.getQuestionCount();
    let newQues = new Question({
      title: title,
      body: body,
      counter: counter,
      author: author,
      tags: tags
    });
    try{
      let z = await newQues.save();
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
  async getQuestionByCounter(counter){
    console.log(counter);
    try{
      let question = await Question.find({counter: counter});
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

module.exports = QuestionController;