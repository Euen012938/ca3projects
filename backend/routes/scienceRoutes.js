const express = require("express");
const router = express.Router();

// const controller = require("../controller/inventoryController");
const controller = require('../controller/scienceController')
// router.get("/", controller.getAllInventory);
// router.get("/:id", controller.getInventoryByID);
router.get('/allquestion', controller.getQuestionsAll);
router.get("/question", controller.getQuestions);
router.get('/revision', controller.getRevision);
router.get('/option/:scienceid', controller.getOptions);
/////////////////////////incompleted questions/////////////////////////
router.get('/question/heat', controller.getHeatQuestionI);
router.get('/question/matter', controller.getMatterQuestionI);
router.get('/question/living', controller.getLivingQuestionI);
router.get('/question/digest', controller.getDigestQuestionI);
/////////////////////////completed questions/////////////////////////
router.get('/revision/heat', controller.getHeatQuestionC);
router.get('/revision/matter', controller.getMatterQuestionC);
router.get('/revision/living', controller.getLivingQuestionC);
router.get('/revision/digest', controller.getDigestQuestionC);

module.exports = router;