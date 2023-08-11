const express = require("express");
const router = express.Router();

const controller = require('../controller/loginController')


router.post('/', controller.login); 
router.post('/register',controller.register)
router.post('/adminverify', controller.adminLogin)

module.exports = router;
