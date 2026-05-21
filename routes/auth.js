const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");

// =========================
// SIGNUP
// =========================
router.post("/signup", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if user already exists
        const existing = await User.findOne({ email });
        if (existing) {
            return res.status(400).json({ message: "Email already registered" });
        }

        // Hash password
        const hashed = await bcrypt.hash(password, 10);

        const user = await User.create({
            name,
            email,
            password: hashed
        });

        res.status(201).json({
            message: "Signup successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

// =========================
// LOGIN
// =========================
router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Wrong password" });
        }

        res.json({
            message: "Login successful",
            user: {
                _id: user._id,
                name: user.name,
                email: user.email
            }
        });

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;