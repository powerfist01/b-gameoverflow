const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const GameSchema = new Schema({
  title: {
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