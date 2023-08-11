const express = require("express");
const router = express.Router();

const controller = require('../controller/mathController')

//    CRUD 

router.get('/hist',controller.getMathHist)
router.post('/',controller.postMathHist)
router.get('/comments', controller.getMathComments)
router.post('/comments',controller.postcomments)
router.put('/comments',controller.editComments)
router.delete('/comments',controller.delComments)

router.get('/AdminComments',controller.adminComments)


module.exports = router;
