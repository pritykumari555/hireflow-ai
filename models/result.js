const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
    user: {
        name:  { type: String, required: true },
        email: { type: String, required: true }
    },
    company:   { type: String, required: true },
    mcqScore:  { type: Number, default: 0 },
    mcqTotal:  { type: Number, default: 0 },
    aiScore:   { type: Number, default: 0 },
    totalScore:{ type: Number, default: 0 },
    status:    { type: String, default: "Pending" } // Pending, Selected, Rejected
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);