const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  body: {
    type: String
  },
  questions: {
    type: Array
  },
  games: {
    type: Array
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;