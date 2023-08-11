const express = require("express");
const router = express.Router();

const controller = require("../controller/healthController");

router.get("/", controller.FindAllHealthComments);
router.get("/:id", controller.findByID);
router.post("/", controller.insert);
router.put("/:id", controller.Edit);
router.delete("/:id", controller.delete);

router.get("/HealthComments", controller.FindAllHealthComments);
router.get("/HealthComments/:ID", controller.FindByID);
router.post("/HealthComments/", controller.Insert);
router.put("/HealthComments/:ID", controller.Edit);
router.delete("/HealthComments/:ID", controller.Delete);

module.exports = router;
