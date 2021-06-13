const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Genrechema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    genreId: {
        type: Number,
        required: true
    },
    gamesCount: {
        type: Number,
        default: 0
    },
    backgoundImage: {
        type: String
    },
    description: {
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

const Genre = mongoose.model('Genre', Genrechema);

module.exports = Genre;