const express = require("express");
const router = express.Router();
const {
  createPersona,
  getPersonaById,
  getAllPersonas,
} = require("../controller");

router.post("/persona", createPersona);

router.get("/persona", getAllPersonas);

router.get("/persona/:id", getPersonaById);

module.exports = router;
