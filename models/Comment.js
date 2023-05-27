const mongoose = require('mongoose');
const User = require('./User');

const { Schema } = mongoose;

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
        type: Schema.Types.ObjectId,
        ref: 'users'
    }
})

module.exports = mongoose.model('comments', CommentSchema);
