

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    Id:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('user', userSchema);