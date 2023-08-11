const express = require("express");
const router = express.Router();

const controller = require('../controller/adminController')
////////////////////////////////////////science////////////////////////////////////////////////////////
//Student actions
router.get("/student", controller.getStudent);
router.delete("/student/:id", controller.deleteStudent);
router.put('/student/:userid', controller.updateStudent);
//Question actions
router.put('/question/:scienceid', controller.updateQuestion);
router.delete('/question/:id', controller.deleteQuestion);
router.post('/question', controller.insertQuestion);

router.post('/question/option', controller.insertOptions);
router.put('/question/option/:scienceid', controller.updateOptions);
//Admin actions
router.get('/admin', controller.getAdmin);
router.put('/admin/:userid', controller.updateAdmin);
router.delete('/admin/:userid', controller.deleteAdmin);
router.post('/admin', controller.insertAdmin);
//Math Comments
router.get('/mathComments', controller.getComments)
router.get('/mathAdminComments', controller.getAdminComments)
router.post('/mathAdminComments', controller.postAdminComments)

module.exports = router;