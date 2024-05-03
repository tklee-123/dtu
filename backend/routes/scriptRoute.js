const express = require("express");
const router = express.Router();
const scriptController = require("../controllers/scriptController")
const middlewareController = require("../controllers/middlewareController");
const { route } = require("./playerRoute");
router.post("/getQuestionInfo", scriptController.getQuestionInfo);
router.post("/getAnsweredQuestion", scriptController.getAnsweredQuestion);
router.post("/openVideo", scriptController.openVideo);
router.get("/process_batch", scriptController.run); 
router.get("/insertData", middlewareController.verifyTokenAndAdmin, scriptController.insertData);
router.post("/get_nearest", scriptController.get_nearest_player);
router.get("/get_recommended_questions/:id", scriptController.get_recommended_question);
router.get("/get_infor/:id", scriptController.get_infor);
router.post("/get_id", scriptController.get_id)
module.exports = router