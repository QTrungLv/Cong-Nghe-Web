const mongoose = require('mongoose');
const User = require('./User');
const Schema = mongoose.Schema;
const Comment = require('./Comment');
const VideoSchema = new Schema({
    url: {
        type: String,
        required: true
    },
    viewers: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'users'
        }],
        default: []
    },
    createAt: {
        type: Date,
        default: Date.now
    },
    comments: {
        type: [{
            type: Schema.Types.ObjectId,
            ref: 'comments',
        }],
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