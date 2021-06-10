const QuestionService = require('../services/questions');
const TagService = require('../services/tags');

module.exports = {
    getAllQuestions: async (req, res, next) => {
        let questionService = new QuestionService();
        let questions = await questionService.getAllQuestions();
        console.log(questions);
        res.send(questions);
    },
    getQuestionByQuestionNumber: async (req, res, next) => {
        let questionService = new QuestionService();

        let question = await questionService.getQuestionByQuestionNumber(req.params.id);
        res.send(question);
    },
    askQuestion: async (req, res, next) => {
        try {
            const { title, description, tags , author} = req.body;
            if(!title || !description || !tags || !author){
                return res.status(400).send({ success: false, msg: 'Please provide valid inputs!' })
            }
            let questionService = new QuestionService();
            let questionCreated = await questionService.createNewQuestion(title, description, tags, author);
            if (questionCreated.success) {
                let tagService = new TagService();
                let addedNewTags = await tagService.addNewTags(questionCreated.result.tags, questionCreated.result._id);
                return res.json({ success: true, msg: 'New question created!' });
            } else {
                return res.status(500).send({ success: false, msg: 'Server Error!' })
            }
        } catch (err) {
            console.log('Error occured in ask question', err)
            return res.status(500).send({ success: false, msg: 'Server Error!' });
        }
    },
    upvoteQuestion: async (req, res, next) => {
        const { questionNumber, upvoter } = req.body;
        return res.json({ '1': '2' })

    }
}