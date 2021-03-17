const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  questions: {
    type: Array
  },
  games: {
    type: Array
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  }
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;