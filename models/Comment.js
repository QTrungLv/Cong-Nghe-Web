const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
    id: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    commentAt: {
        type: Date,
        require: true,
        default: Date.now
    },
    author: {
        type: User,
        required: true
    }
})

module.exports = mongoose.model('comments', CommentSchema);