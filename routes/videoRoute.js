const router = require('express').Router();
const multer = require('multer');

const upload = multer({ storage: multer.memoryStorage() })

const videoController = require('../controller/videoController')

const verifyToken = require('../middleware/userMiddileware')

router.post("/", videoController.addVideo)

router.get("/", verifyToken, videoController.getListVideo)

router.get("/:id", videoController.getVideoById)

//router.put("/:id", verifyToken, videoController.changeVideoTitle)

router.post("/comment/:id", videoController.addCommentVideo)

router.post("/viewer/:id", videoController.addViewer)

router.delete(":id", verifyToken, videoController.deleteVideo)

router.delete("/comment/:id", videoController.deleteComment)

router.post("/uploads", upload.single("video"), videoController.uploadVideo)

module.exports = router