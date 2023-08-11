const express = require("express");
const router = express.Router();

//collecting modules from each routes
const loginRoutes = require('./loginRoutes.js')
const englishRoutes = require('./englishRoutes.js')
const mathRoutes = require('./mathRoutes.js')
const scienceRoutes = require("./scienceRoutes")
const healthRoutes = require("./healthRoutes")
const shopRoutes = require("./shopRoutes.js")
const adminRoutes = require("./adminRoutes.js")
// const exchangeRoutes = require("./exchangeRoutes.js")

//routing back to the mainn routes

router.use("/login", loginRoutes)
router.use("/english", englishRoutes)
router.use("/math", mathRoutes)
router.use("/science", scienceRoutes)
router.use("/Health", healthRoutes)
router.use("/shop", shopRoutes)
router.use("/admin", adminRoutes)
// router.use("/exchange",exchangeRoutes)

module.exports = router;
