const router = require('express').Router();

const userController = require('../controller/userController');

router.get("/", userController.getInfoUser);

router.get("/:id", userController.getInfoUserById)

router.post("/", userController.updateInfoUser)



module.exports = router