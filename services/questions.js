const QuestionController = require('../controllers/questions');
const TagController = require('../controllers/tags');

module.exports = {
  getAllQuestions: async (req,res,next) => {
    let promise = new Promise(function(resolve, reject){
      setTimeout(() => {
        resolve("SUjeet is good boy");
      }, 5000);
    })
    promise.then(function(data){
      res.send(data);
    })
    .catch(function(err){
      res.send(err);
    })
  },
  getQuestionById: async (req,res,next) => {
    console.log(req);
    
    res.send("lol-questions")
  },
  create: async (req,res,next) => {
    const {title, body, tags} = req.body;
    let QC = new QuestionController();
    let resp = await QC.createQuestion(title, body);
    console.log(resp)
    res.send("Aaddded question")
  }
}