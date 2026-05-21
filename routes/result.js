const router = require("express").Router();
const Result = require("../models/result");

// SAVE RESULT
router.post("/", async (req, res) => {
    try {
        const { user, company, mcqScore, mcqTotal, aiScore } = req.body;

        const totalScore = mcqScore + aiScore;

        const result = await Result.create({
            user,
            company,
            mcqScore,
            mcqTotal,
            aiScore,
            totalScore,
            status: totalScore >= (mcqTotal + 10) / 2 ? "Selected" : "Rejected"
        });

        res.status(201).json(result);

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// GET ALL RESULTS (leaderboard)
router.get("/", async (req, res) => {
    try {
        const results = await Result.find()
            .sort({ totalScore: -1 })
            .limit(100);

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET RESULTS BY COMPANY
router.get("/:company", async (req, res) => {
    try {
        const results = await Result.find({
            company: { $regex: new RegExp(`^${req.params.company}$`, "i") }
        }).sort({ totalScore: -1 });

        res.json(results);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;