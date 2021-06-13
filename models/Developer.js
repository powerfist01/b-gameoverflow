const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DeveloperSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    slug: {
        type: String,
        required: true
    },
    gamesCount: {
        type: Number,
    },
    imageBackgroundLink: {
        type: String
    },
    games: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Game'
    }],
    description: {
        type: String
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

const Developer = mongoose.model('Developer', DeveloperSchema);

module.exports = Developer;