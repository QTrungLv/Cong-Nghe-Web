



const express = require('express');
const router = express.Router();
const videoController = require('../controller/VideoController')
const userMiddleWare = require('../middleware/user')

router.post('/:id', userMiddleWare.authMiddleware,videoController.updateVideoController);
router.get('/search',userMiddleWare.authMiddleware ,videoController.searchVideoController);
router.get('/:id',userMiddleWare.authMiddleware ,videoController.getVideoController);
router.get('/delete/:id',userMiddleWare.authMiddleware ,videoController.deleteVideoController);
router.get('',userMiddleWare.authMiddleware ,videoController.getAllVideoController);
module.exports = router;