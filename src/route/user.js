const express = require("express");
const router = express.Router();
const {
  createUser,
  setPassword,
  loginUser,
} = require("../controller/user");

router.post("/users", createUser);
router.post("/users/set_password", setPassword);
router.post("/users/login", loginUser);

module.exports = router;
