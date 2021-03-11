module.exports = function(express){
  const questionService = require('../sevices/questions');
  const router = express.Router();
  
  router.get('/', questionService.getAllQuestions);

  router.get('/:questionId', questionService.getQuestionById);

  router.post('/addQuestion', questionService.addQuestion);

  return router;
}