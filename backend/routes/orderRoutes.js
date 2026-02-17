const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

router.post("/place", orderController.placeOrder);
router.get("/user/:user_id", orderController.getUserOrders);
router.get("/", orderController.getAllOrders);
router.get("/all", orderController.getAllOrders);
router.put("/status/:id", orderController.updateStatus);

module.exports = router;
