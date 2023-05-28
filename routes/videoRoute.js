const router = require('express').Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() })

const videoController = require('../controller/VideoController')

const verifyToken = require('../middleware/userMiddileware')

router.post("/", verifyToken, videoController.addVideo)

router.get("/", verifyToken, videoController.getListVideo)

router.get("/:id", verifyToken, videoController.getVideoById)

//router.put("/:id", verifyToken, videoController.changeVideoTitle)

router.get('', verifyToken, videoController.getAllVideoController);

router.post("/comment/:id", verifyToken, videoController.addCommentVideo)

router.post("/viewer/:id", verifyToken, videoController.addViewer)

router.delete(":id", verifyToken, videoController.deleteVideo)

router.delete("/comment/:id", verifyToken, videoController.deleteComment)

router.post('/:id', verifyToken, videoController.updateVideoController);

router.get('/search', verifyToken, videoController.searchVideoController);

router.get('/:id', verifyToken, videoController.getVideoController);

router.get('/delete/:id', verifyToken, videoController.deleteVideoController);

router.post("/uploads", upload.single("video"), videoController.uploadVideo)

module.exports = router