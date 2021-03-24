module.exports = function(express){
  const questionService = require('../services/questions');
  const router = express.Router();
  
  router.get('/', questionService.getAllQuestions);

  router.get('/:id', questionService.getQuestionById);

  router.post('/ask', questionService.create);

  return router;
}