const express = require("express");
const router = express.Router();
const scriptController = require("../controllers/scriptController")
const middlewareController = require("../controllers/middlewareController");
const { route } = require("./playerRoute");
router.post("/createQuestionPool",scriptController.createQuestionPool)
router.post("/post_question", middlewareController.verifyToken,scriptController.getQuestionInfo)
router.get("/get_major_level", scriptController.get_player_major_level)
router.post("/updateAnsweredQuestion", scriptController.deleteOldQuestions);
router.post("/getQuestionInfo", scriptController.getQuestionInfo);
router.post("/getAnsweredQuestion", scriptController.getAnsweredQuestion);
router.post("/openVideo", scriptController.openVideo);
router.get("/run",middlewareController.verifyToken, scriptController.runAlgorithm); 
router.get("/insertData", middlewareController.verifyTokenAndAdmin, scriptController.insertData)
module.exports = router