const User = require("../models/User")

exports.creatUser = async (user) => {
    try {
        const user = await User
    } catch (error) {

    }
}

exports.getInfoUserById = async (_id) => {
    try {
        const user = await User.findOne({ _id: _id })
        if (!user) {
            throw new Error('User not found')
        }
        return user
    } catch (error) {
        throw new Error(error.message)
    }
}


exports.getInfoUserByEmail = async (_email) => {
    try {
        const user = await User.findOne({ email: _email });
        if (!user) {
            throw new Error('User not found')
        }
        return user
    } catch (error) {
        throw new Error(error.message)
    }

};

exports.updateUser = async (_id, user) => { }

exports.deleteUser = async (_id) => { };