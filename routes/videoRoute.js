const multer = require('multer');
const router = require('express').Router();

const videoController = require('../controller/videoController')

const upload = multer({ storage: multer.memoryStorage() })

router.post("/", upload.single("video"), videoController.addVideo)

module.exports = router