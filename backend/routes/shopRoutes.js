const express = require("express");
const router = express.Router();
const shopController = require('../controller/shopController');


router.get("/gifts", shopController.getGifts);
router.get("/coins/:username", shopController.getCoins);
router.post("/redeem/:userid/:giftname", shopController.redeemGift);
router.get("/quests", shopController.getQuests);
router.get("/usernames", shopController.getUsernames); // New route to fetch usernames
router.put("/coins/:username", shopController.updateCoins);
router.put("/quests", shopController.addQuest);
router.delete("/quests/:questId", shopController.removeQuest);
router.delete("/users/:username", shopController.removeUser);

module.exports = router;