const express = require("express")
const userController = require("../controllers/userController")

const router = express.Router();

router.post('/signup', userController.signup)
router.post('/login', userController.login)
router.post('/logout', userController.logout)
router.delete('/deleteUser', userController.deleteUser)

module.exports = router;