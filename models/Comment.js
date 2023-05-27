const mongoose = require('mongoose');
const User = require('./User');

const { Schema } = mongoose;

const CommentSchema = new Schema({
<<<<<<< HEAD
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
=======
  id: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  commentAt: {
    type: Date,
    require: true,
    default: Date.now,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: 'users',
  },
});
>>>>>>> e165e4dc59762adc91942554cf77566f9963d831

module.exports = mongoose.model('comments', CommentSchema);
