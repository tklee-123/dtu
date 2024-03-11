const express = require("express");
const router = express.Router();
const playerController = require("../controllers/playerController")
router.post("/add_player", playerController.register)
router.post("/add_account", playerController.createAccount);
module.exports = router