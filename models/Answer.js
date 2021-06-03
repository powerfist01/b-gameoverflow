const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AnswerSchema = new Schema({
  answer: {
    type: String,
    required: true
  },
  question_id: {
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
  accepted_answer: {
    type: Boolean
  },
  accepted_answer_at: {
    type: Date
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;