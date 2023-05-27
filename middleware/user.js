/* eslint-disable consistent-return */
/* eslint-disable class-methods-use-this */
const jwt = require('jsonwebtoken');

class UserMiddleWare {
  authMiddleware = (req, res, next) => {
    const token = req.headers.token.split(' ')[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
      if (err) {
        return res.status(404).json({
          message: 'The user is not authentication',
        });
      }
      console.log('user: ', user);

      if (user.isUser) {
        next();
      } else {
        return res.status(404).json({
          message: 'The user is not authentication',
        });
      }
    });
  };
}

module.exports = new UserMiddleWare();
