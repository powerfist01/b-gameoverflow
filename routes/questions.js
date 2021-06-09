module.exports = function (express) {
    const questionController = require('../controllers/questions');
    const router = express.Router();

    router.get('/', questionController.getAllQuestions);

    router.get('/:id', questionController.getQuestionById);

    router.post('/ask', questionController.create);

    router.post('/upvoteQuestion', questionController.upvoteQuestion)

    return router;
}