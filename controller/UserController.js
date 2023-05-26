const { use } = require('passport');
const { searchUserService, getDetailsUserService, getUserService } = require('../services/UserService');

exports.detailsUserController = async (req, res) => {
  getDetailsUserService()
    .then((user) => {
      res.send({ success: true, user });
    })
    .catch((err) => {
      res.status(404).send({ success: false, err: err.message });
    });
};

exports.getUserController = async (req, res) => {
  const { email } = req.params;
  getUserService(email)
    .then((user) => {
      res.send({ success: true, user });
    })
    .catch((err) => {
      res.status(404).send({ success: false, err: err.message });
    });
};
