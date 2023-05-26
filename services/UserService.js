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
