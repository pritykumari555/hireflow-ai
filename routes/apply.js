// routes/apply.js
const router = require("express").Router();
const mongoose = require("mongoose");

// Application schema (inline — or move to models/application.js)
const applicationSchema = new mongoose.Schema({
    name:        { type: String, required: true },
    email:       { type: String, required: true },
    skill:       { type: String },
    github:      { type: String },
    projectLink: { type: String },
    company:     { type: String, required: true },
}, { timestamps: true });

const Application = mongoose.model("Application", applicationSchema);

// ✅ POST /apply  — must be "/" because server already mounts at "/apply"
router.post("/", async (req, res) => {
    try {
        const app = await Application.create(req.body);
        res.status(201).json(app);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// Optional: GET all applications
router.get("/", async (req, res) => {
    try {
        const apps = await Application.find().sort({ createdAt: -1 });
        res.json(apps);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;