



const express = require('express');
const router = express.Router();
const videoController = require('../controller/VideoController')


router.get('/search', videoController.searchVideoController);
router.get('/:videoId', videoController.getVideoController);
router.get('/delete/:id', videoController.deleteVideoController);
module.exports = router;