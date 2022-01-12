module.exports = function (express, passport) {
    const questionController = require('../controllers/questions');
    const router = express.Router();

    router.get('/', questionController.getAllQuestions);

    router.get('/:id', questionController.getQuestionByQuestionNumber);

    router.post('/askQuestion', passport.authenticate('jwt', { session: false }), questionController.askQuestion);

    router.post('/upvoteQuestion', passport.authenticate('jwt', { session: false }), questionController.upvoteQuestion);

    return router;
}