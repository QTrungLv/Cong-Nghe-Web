const router = require('express').Router();

const userController = require('../controller/userController');

router.get("/", userController.getInfoUser);

router.post("/", userController.)

router.post("/:id", userController)

module.exports = router