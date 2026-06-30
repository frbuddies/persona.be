const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {},
  {
    strict: false, // Accept any fields
    timestamps: true,
  },
);

module.exports = mongoose.model("User",userSchema );
