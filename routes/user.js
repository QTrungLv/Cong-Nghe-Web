
const express = require('express');
const router = express.Router();
const passport = require('passport')
const session = require('express-session');
require('../controller/LoginController')

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
  router.use(session({ secret: 'cats'}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get( '/auth/google/callback',
  passport.authenticate( 'google', {
    successRedirect: '/login/protected',
    failureRedirect: '/auth/google/failure'
  })
);

router.get('/auth/google/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });

  router.get('/protected',isLoggedIn, (req, res) => {
    res.send('Hello');
  });

  router.get('/', (req, res) => {
    res.send('<a href = "/login/auth/google">Authenticate with Google</a>');
})
  module.exports = router;