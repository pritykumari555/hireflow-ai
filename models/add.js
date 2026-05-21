const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URL).then(async () => {
    console.log("Connected ✅");

    const Question = require("./models/question");

    await Question.create({
        company: "Google",
        question: "What is React?",
        options: ["Library", "Framework", "Language", "Database"],
        answer: "Library"
    });

    await Question.create({
        company: "Google",
        question: "What is JSX?",
        options: ["JavaScript XML", "Java Syntax", "JSON Extension", "None"],
        answer: "JavaScript XML"
    });

    await Question.create({
        company: "Google",
        question: "What is useState in React?",
        options: ["A Hook", "A Component", "A Library", "A Method"],
        answer: "A Hook"
    });

    console.log("3 Questions added ✅");
    process.exit();
});