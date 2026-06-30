const express = require("express");
const router = express.Router();
const persona = require("./persona")
const user = require("./user")

router.use(persona);
router.use(user);

module.exports = router;
