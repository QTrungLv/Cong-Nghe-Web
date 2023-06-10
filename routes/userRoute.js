const router = require('express').Router();

const jwt = require('jsonwebtoken');
const express = require('express');

const passport = require('passport');
const session = require('express-session');
const { OAuth2Client } = require('google-auth-library');
const authMiddleware = require('../middleware/user');
const userLoginController = require('../controller/LoginController');
const userController = require('../controller/UserController');
const userMiddleWare = require('../middleware/user');
const verifyToken = require('../middleware/userMiddileware')

router.use(session({ secret: 'cats' }));
router.use(passport.initialize());
router.use(passport.session());

router.get('/login/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }));

router.get(
    '/login/auth/google/callback',
    passport.authenticate('google', {
        failureRedirect: '/login/auth/google/failure',
    }),
    userLoginController.login
);

router.get('/login/auth/google/failure', userLoginController.fail)

router.get('/person/login', userLoginController.index)

router.get("/:id", verifyToken, userController.getInfoUserById)

router.get('/filter/:email', verifyToken, userController.getUserController);

router.post("/", userController.saveUser)

module.exports = router;

// successRedirect: '/login/protected',



module.exports = router