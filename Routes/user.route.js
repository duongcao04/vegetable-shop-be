const router = require('express').Router();
const userController = require('../Controllers/user.controller');

//REGISTER USER
router.post("/register", userController.registerUser);

//LOGIN USER
router.post("/login", userController.loginUser);

//GET ALL USER
router.get("/", userController.getAllUser);

//DELETE USER
router.delete("/:id", userController.deleteUser);

module.exports = router;