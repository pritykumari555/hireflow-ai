const router = require("express").Router();
const Question = require("../models/question");

// ADD QUESTION
router.post("/", async (req, res) => {
    try {
        const q = await Question.create(req.body);
        res.status(201).json(q);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// GET QUESTIONS BY COMPANY
router.get("/:company", async (req, res) => {
    try {
        console.log("Searching for company:", req.params.company);

        const data = await Question.find({
            company: { $regex: new RegExp(`^${req.params.company}$`, "i") }
        });

        console.log("Found questions:", data.length);

        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;