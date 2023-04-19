const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const VideoSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    viewers: {
        type: [User],
        required: true,
        default: []
    },
    createAt: {
        type: String,
        default: Date.now
    },
    comments: {
        type: [Comment],
        required: true,
        default: []
    },
    userId: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    }

})

module.exports = mongoose.model('videos', VideoSchema);