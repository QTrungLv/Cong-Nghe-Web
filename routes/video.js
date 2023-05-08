const express = require('express');
const router = express.Router();
const videoController = require('../controller/VideoController')


router.get('/search', videoController.searchVideoController);