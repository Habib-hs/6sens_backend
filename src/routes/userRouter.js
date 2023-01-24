const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.post("/createuser", userController.createUser);
router.get("/users", userController.getUsers);
router.get("/user/:userId", userController.getUser);

router.put("/user/:userId", userController.updateUser);
router.delete("/user/:userId", userController.deleteUser);

router.post("/user/block/:userId", userController.blockUser);
router.post("/user/unblock/:userId", userController.unblockUser);

module.exports = router;
