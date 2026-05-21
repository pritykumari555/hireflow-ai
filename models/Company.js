const mongoose = require("mongoose");

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  logo: String,
  role: String,
  batch: String,
  description: String,
  link: String
});

module.exports = mongoose.model("Company", companySchema);