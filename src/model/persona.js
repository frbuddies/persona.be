const mongoose = require("mongoose");

const personaSchema = new mongoose.Schema(
  {},
  {
    strict: false, // Accept any fields
    timestamps: true,
  },
);

module.exports = mongoose.model("Persona", personaSchema);
