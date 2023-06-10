const { use } = require('passport');
const { searchUserService, getDetailsUserService, getUserService, checkUser } = require('../services/UserService');

const { getInfoUserById } = require("../services/UserService")
const { getInfoUserByEmail } = require("../services/UserService")
const jwt = require('jsonwebtoken');
const User = require("../models/User")

exports.getUserController = async (req, res) => {
  const { email } = req.params;
  console.log(email)
  getUserService(email)
    .then((user) => {
      res.send({ success: true, user });
    })
    .catch((err) => {
      res.status(404).send({ success: false, err: err.message });
    });
};


// exports.getInfoUser = async (req, res) => {
//   const { _id, email } = req.body

//   getInfoUserByEmail(email)
//     .then(user => {
//       res.send({ success: true, user: user })
//     })
//     .catch(err => {
//       res.status(404).send({ success: false, err: err.message })
//     })
// }

exports.getInfoUserById = async (req, res) => {
  const _id = req.params.id;

  getInfoUserById(_id)
    .then(user => res.send({ success: true, user: user }))
    .catch((err) => res.status(405).send({ success: false, err: err.message }))


}


exports.saveUser = async (req, res) => {
  const { name, email, avatar } = req.body
  let user = null;
  checkUser(email)
    .then(async (value) => {
      console.log("Value: ",value)
      if (!value) {
        user = new User({
          name: name,
          email: email,
          avatar: avatar
        })

        await user.save()

      } else {
        user = value
      }

      const access_token = jwt.sign(
        {
          email,
          name,
          avatar,
        },
        process.env.ACCESS_TOKEN_SECRET,
        { expiresIn: '1h' }
      );

      res.send({success: true, token: access_token, user: user});

    })
    .catch(err => res.status(406).send({ success: false, err: err.message }))

}

