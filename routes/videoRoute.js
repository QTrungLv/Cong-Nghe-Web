const router = require('express').Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() })

const videoController = require('../controller/VideoController')

const verifyToken = require('../middleware/userMiddileware')

router.post("/", verifyToken, videoController.addVideo)

router.get("/:id", verifyToken, videoController.getVideoById)

router.get('', verifyToken, videoController.getAllVideoController);

router.post("/comment/:id", videoController.addCommentVideo)

router.post("/viewer/:id", verifyToken, videoController.addViewer)

router.delete("/comment/:id", verifyToken, videoController.deleteComment);

router.post('/:id', verifyToken, videoController.updateVideoController);

router.get('/search/name', verifyToken, videoController.searchVideoController);

router.delete('/:id', verifyToken, videoController.deleteVideoController);

module.exports = router