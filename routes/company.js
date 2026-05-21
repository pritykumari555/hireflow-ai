const router = require("express").Router();
const Company = require("../models/company");

// ADD COMPANY
router.post("/", async (req, res) => {
  try {
    const company = await Company.create(req.body);
    res.status(201).json(company);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET ALL COMPANIES
router.get("/", async (req, res) => {
  try {
    const companies = await Company.find();
    res.json(companies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;