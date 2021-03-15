const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true
  },
  game_id: {
    type: Number,
    required: true
  },
  description: {
    type: String
  },
  platforms: {
    type: Array
  },
  genres: {
    type: Array
  },
  website: {
    type: String
  },
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date
  }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;