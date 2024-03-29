const express = require("express");
const router = express.Router();
const scriptController = require("../controllers/scriptController")
const middlewareController = require("../controllers/middlewareController");
const { route } = require("./playerRoute");
router.post("/createQuestionPool", middlewareController.verifyToken,scriptController.createQuestionPool)
router.post("/post_question", middlewareController.verifyToken,scriptController.getQuestionInfo)
router.get("/get_major_level", middlewareController.verifyToken, scriptController.get_player_major_level)
module.exports = router