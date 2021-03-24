const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionCounterSchema = new Schema({
  counter: {
    type: Number,
    default: 1,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const QuestionCounter = mongoose.model('QuestionCounter', QuestionCounterSchema);

module.exports = QuestionCounter;