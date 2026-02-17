const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

router.post("/add", cartController.addCart);
router.get("/:user_id", cartController.getCart);

module.exports = router;
