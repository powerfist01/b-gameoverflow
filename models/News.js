const mongoose = require('mongoose');

const NewsSchema = new mongoose.Schema({
    heading: {
        type: String,
        required: true
    },
    subHeading: {
        type: String,
        required: true
    },
    link: {
        type: String
    },
    tags: {
        type: Array
    },
    body: {
        type: String
    },
    author: {
        type: String
    },
    timeToRead: {
        type: String
    },
    image: {
        type: String
    },
    imageDescription: {
        type: String,
    },
    likes: {
        type: Number,
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

const News = mongoose.model('News', NewsSchema);

module.exports = News;