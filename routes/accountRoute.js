const express = require("express");
const router = express.Router();
const accountController = require("../controllers/accountController")
router.post("/create_account", accountController.registerUser)
router.post("/login", accountController.loginUser)
router.post("/logout", accountController.userLogout)
module.exports = router