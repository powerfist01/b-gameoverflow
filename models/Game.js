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
  gameId: {
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
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date
  }
});

const Game = mongoose.model('Game', GameSchema);

module.exports = Game;