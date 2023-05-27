const express = require('express');

const router = express.Router();
const videoController = require('../controller/VideoController');
const userMiddleWare = require('../middleware/user');

router.post('/:id', videoController.updateVideoController);
router.get('/search', videoController.searchVideoController);
router.get('/:id', videoController.getVideoController);
router.get('/delete/:id', videoController.deleteVideoController);
router.get('', videoController.getAllVideoController);
module.exports = router;
