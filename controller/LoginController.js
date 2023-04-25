const passport = require('passport')
const GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;

const GOOGLE_CLIENT_ID = '613658840979-vlgba1s1g94h38vbe2q2r3ovh8t2169e.apps.googleusercontent.com';
const GOOGLE_CLIENT_SECRET = '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';
const User = require('../models/User');

passport.use(new GoogleStrategy({
  clientID: '613658840979-vlgba1s1g94h38vbe2q2r3ovh8t2169e.apps.googleusercontent.com',
  clientSecret: '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',
  callbackURL: "http://localhost:3000/login/auth/google/callback"
},
  async function (accessToken, refreshToken, profile, done) {

      try {
          let user = await User.findOne({Id: profile.id });
          if (user) {
              console.log("user is there");
              done(null, user);
          } else {
              const newUser = {   
                  Id: profile.id,
                  name: profile.displayName,
                  email: profile.emails[0].value,
                  avatar: profile.photos[0].value
              };
              user = await User.create(newUser);
              console.log("creating new user");
              done(null, user);
          }
      } catch (err) {
          console.error(err);
      }

  }
));

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});

