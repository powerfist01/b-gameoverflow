const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LearnGameSchema = new Schema({
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
  link: {
    type: String,
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const LearnGame = mongoose.model('LearnGame', LearnGameSchema);

module.exports = LearnGame;