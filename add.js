const mongoose = require("mongoose");

require("dotenv").config();

const Question = require("./models/question");

mongoose.connect(process.env.MONGO_URL)

.then(async () => {

    console.log("MongoDB Connected ✅");

    // Delete old questions
    await Question.deleteMany();

    const questions = [

        // ================= GOOGLE =================

        {
            company: "Google",
            question: "What is React?",
            options: [
                "Library",
                "Framework",
                "Database",
                "Language"
            ],
            answer: "Library"
        },

        {
            company: "Google",
            question: "What is JSX?",
            options: [
                "JavaScript XML",
                "Java Syntax",
                "JSON Extension",
                "None"
            ],
            answer: "JavaScript XML"
        },

        // ================= NETFLIX =================

        {
            company: "Netflix",
            question: "Which hook manages state in React?",
            options: [
                "useState",
                "useEffect",
                "useRef",
                "useMemo"
            ],
            answer: "useState"
        },

        {
            company: "Netflix",
            question: "Node.js is mainly used for?",
            options: [
                "Frontend",
                "Backend",
                "Database",
                "Animation"
            ],
            answer: "Backend"
        },

        // ================= AMAZON =================

        {
            company: "Amazon",
            question: "Which data structure uses FIFO?",
            options: [
                "Stack",
                "Queue",
                "Tree",
                "Graph"
            ],
            answer: "Queue"
        },

        {
            company: "Amazon",
            question: "What is API?",
            options: [
                "Application Programming Interface",
                "Advanced Program Internet",
                "None",
                "Application Process Interface"
            ],
            answer: "Application Programming Interface"
        }

    ];

    await Question.insertMany(questions);

    console.log("Questions Inserted ✅");

    process.exit();

})

.catch((err) => {

    console.log(err);

});