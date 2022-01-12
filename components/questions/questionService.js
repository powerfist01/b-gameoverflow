const Question = require('./Question')
const QuestionNumber = require('./QuestionNumber')

class QuestionService {
    constructor() {

    }
    async getAllQuestions() {
        let res = await Question.find({}).sort({ createdAt: -1 });
        return res;
    }
    async getNewQuestionNumber() {

        try {
            let questionNumber = await QuestionNumber.find();
            let number;
            if (questionNumber && questionNumber.length != 0) {
                let questionNumber = await QuestionNumber.findOneAndUpdate({}, { $inc: { questionNumber: 1 } }, { new: true });
                number = questionNumber['questionNumber'];
            } else {
                let newQuestionNumber = new QuestionNumber();
                let newSaved = await newQuestionNumber.save();
                number = newSaved['questionNumber'];
            }
            return number;
        } catch (err) {
            console.log('Error in getting the new question number');
        }
    }
    async getTagsArrayUsingString(tags) {
        try {
            let arr = tags.split(',');
            let brr = [];
            for (let i = 0; i < arr.length; i++) {
                brr.push(arr[i].trim());
            }
            return brr;
        } catch (err) {
            console.log('Error occured in splitting tags in array');
            return [];
        }
    }
    async createNewQuestion(title, description, tags, author) {
        try {
            let questionNumber = await this.getNewQuestionNumber();
            if (questionNumber) {
                let tagsArray = await this.getTagsArrayUsingString(tags);
                if (tagsArray.length > 0 && tagsArray.length <= 5) {
                    let newQuestion = new Question({
                        questionNumber: questionNumber,
                        title: title,
                        description: description,
                        author: author,
                        tags: tagsArray
                    });
                    let questionSaved = await newQuestion.save();
                    return { success: true, result: questionSaved };
                } else {
                    return { success: false, result: 'Total tags must remain between 1 and 5 included!' };
                }
            } else {
                return { success: false, result: 'New question number not found!' };
            }
        } catch (err) {
            console.log('Error in creating a new question');
            return { success: false, error: err, result: 'Error occured!' };
        }
    }
    async getQuestionByQuestionNumber(questionNumber) {
        console.log(questionNumber);
        try {
            let question = await Question.find({ questionNumber: questionNumber });
            console.log(question);
            return question;
        } catch (err) {
            return {
                error: true
            }
        }

    }
    async deleteQuestion() {

    }
    async updateQuestion() {

    }
}

module.exports = QuestionService;
