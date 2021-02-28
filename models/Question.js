const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  votes: {
    type: Number,
    required: true,
    default: 0
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;