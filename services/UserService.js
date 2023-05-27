const User = require("../models/User")

exports.creatUser = async (user) => {
  try {
    const user = await User({})
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
const User = require('../models/User');
const PAGE_SIZE = 2;

exports.getUserService = async (email) => {
  try {
    const findUser = await User.findOne({ email: email });
    if (findUser) {
      return findUser;
    } else {
      throw new Error('User not found');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

exports.getDetailsUserService = async () => {
  try {
    const findUser = await User.findOne({ _id: '646cc416bc54df6fe056bcdb' });
    if (findUser) {
      return findUser;
    } else {
      throw new Error('User not define');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};
