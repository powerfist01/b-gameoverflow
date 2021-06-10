const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionNumberSchema = new Schema({
    questionNumber: {
        type: Number,
        default: 10000001,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
    }
});

const QuestionNumber = mongoose.model('QuestionNumber', QuestionNumberSchema);

module.exports = QuestionNumber;