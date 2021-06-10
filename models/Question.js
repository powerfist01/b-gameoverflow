const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: {
    type: Array,
    required: true
  },
  questionNumber: {
    type: Number,
    required: false
  },
  author: {
    type: String,
    required: true
  },
  views: {
    type: Number,
    required: true,
    default: 0
  },
  upvotes: {
    type: Number,
    required: true,
    default: 0
  },
  upvoters: {
    type: Array,
    required: false,
  },
  downvotes: {
    type: Number,
    required: true,
    default: 0
  },
  downvoters: {
    type: Array,
    required: false,
  },
  votes: {
    type: Number,
    required: true,
    default: 0
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;