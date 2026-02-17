const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/all", userController.getAllUsers);
router.delete("/delete/:id", userController.deleteUser);
router.put("/role/:id", userController.changeRole);

module.exports = router;
