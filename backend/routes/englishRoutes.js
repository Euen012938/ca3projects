const express = require("express");
const router = express.Router();
const controller = require('../controller/englishController')

router.get("/alleng", controller.findAllEng);
router.get("/category/:categoryid/:quizid", controller.findEngByID);
router.get('/categories',controller.categories)
router.get('/questions/:id',controller.quizid)
router.post("/insert",controller.insertEng)
router.put("/update/:id",controller.editEng)
router.delete("/:id",controller.deleteEng)
router.post('/score/:userid' ,controller.postEnglishScore)
router.put('/updatescore/:userid', controller.putEnglishScore);
router.get('/checkuser/:userid',controller.checkUser)
module.exports = router