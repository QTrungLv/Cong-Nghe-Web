const jwt = require('jsonwebtoken')
const express = require('express');
const router = express.Router();
const passport = require('passport')
const session = require('express-session');
require('../controller/LoginController')
const userLoginController = require('../controller/LoginController')
const { OAuth2Client } = require('google-auth-library');
const  userController  = require('../controller/UserController'); 
function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
  router.use(session({ secret: 'cats'}));
router.use(passport.initialize());
router.use(passport.session());

router.get('/login/auth/google',
  passport.authenticate('google', { scope: [ 'email', 'profile' ] }
));

router.get( '/login/auth/google/callback',
  passport.authenticate( 'google', {
    failureRedirect: '/login/auth/google/failure'
  }),userLoginController.login);


router.get('/login/auth/google/failure', userLoginController.fail);
  router.get('/login/protected',isLoggedIn, userLoginController.show);
  router.get('/search', userController.searchUserController);
  router.get('/login', userLoginController.index)
  module.exports = router;



  //successRedirect: '/login/protected',