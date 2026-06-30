const express = require("express");
const router = express.Router();
const {
  createPersona,
  getPersonaById,
  getAllPersonas,
  getAllPersonasSuperAdmin
} = require("../controller");

router.post("/persona", createPersona);

router.get("/persona", getAllPersonasSuperAdmin ,getAllPersonas);

router.get("/persona/:id", getPersonaById);

module.exports = router;
