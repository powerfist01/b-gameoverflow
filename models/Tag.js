const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TagSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  details: {
    type: String
  },
  question_ids: {
    type: Array
  },
  created_at: {
    type: Date,
    default: Date.now
  }
});

const Tag = mongoose.model('Tag', TagSchema);

module.exports = Tag;