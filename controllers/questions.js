const QuestionService = require('../services/questions');
const TagService = require('../services/tags');

module.exports = {
  getAllQuestions: async (req,res,next) => {
    let QC = new QuestionService();
    let questions = await QC.getAllQuestions();
    console.log(questions);
    res.send(questions);
  },
  getQuestionById: async (req,res,next) => {
    console.log(req.params);
    let QC = new QuestionService();

    let question = await QC.getQuestionByQuestionNumber(req.params.id);
    res.send(question);
  },
  create: async (req,res,next) => {
    const {title, body, tags} = req.body;
    console.log(req.body);
    let QC = new QuestionService();
    let author = 'sujeet';
    let resp = await QC.createQuestion(title, body, tags, author);
    console.log(resp);
    if(resp['isSaved'] == true){
      let T = new TagService(tags, resp['_id']);
      let z = await T.addTags();
      res.send(resp);
    } else {
      res.send(resp);
    }
  },
  upvoteQuestion: async (req, res, next) => {
    const {questionNumber, upvoter} = req.body;


  }
}