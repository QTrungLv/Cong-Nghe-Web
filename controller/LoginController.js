const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const jwt = require('jsonwebtoken');

const GOOGLE_CLIENT_ID = '613658840979-vlgba1s1g94h38vbe2q2r3ovh8t2169e.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const express = require('express');
const User = require('../models/User');
require('body-parser').json();

const JWT_SECRET = 'YOUR_JWT_SECRET';
passport.use(
  new GoogleStrategy(
    {
      clientID: '613658840979-vlgba1s1g94h38vbe2q2r3ovh8t2169e.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/user/login/auth/google/callback',
    },
    async (req, res, profile, done) => {
      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (user) {
          console.log('user is there');
          console.log(user);
          done(null, user);
        } else {
          const newUser = {
            name: profile.displayName,
            email: profile.emails[0].value,
            avatar: profile.photos[0].value,
            isUser: true,
          };
          user = await User.create(newUser);
          console.log('creating new user');
          done(null, user);
        }
      } catch (err) {
        console.error(err);
      }
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

class LoginController {
  fail(req, res) {
    res.send('Failed to authenticate..');
  }

  show(req, res) {
    res.send('Hello');
  }

  index(req, res) {
    console.log('1');

    res.send('<a href = "/user/login/auth/google">Authenticate with Google</a>');
  }

  login(req, res) {
    const { isUser, email, name, avatar } = req.user;
    const access_token = jwt.sign(
      {
        isUser,
        email,
        name,
        avatar,
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '1h' }
    );
    console.log('access_token', { access_token });

    res.redirect('/user/login/protected');
  }
}

module.exports = new LoginController();
