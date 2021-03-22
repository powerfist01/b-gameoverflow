const QuestionController = require('../controllers/questions');
const TagController = require('../controllers/tags');

module.exports = {
  getAllQuestions: async (req,res,next) => {
    let QC = new QuestionController();
    let questions = await QC.getAllQuestions();
    console.log(questions);
    res.send(questions);
  },
  getQuestionById: async (req,res,next) => {
    console.log(req);
    
    res.send("lol-questions")
  },
  create: async (req,res,next) => {
    const {title, body, tags} = req.body;
    console.log(req.body);
    let QC = new QuestionController();
    let author = 'sujeet';
    let resp = await QC.createQuestion(title, body, author);
    console.log(resp);
    if(resp['isSaved'] == true){
      let T = new TagController(tags, resp['questionId']);
      let z = await T.addTags();
      res.send(resp);
    } else {
      res.send(resp);
    }
  }
}