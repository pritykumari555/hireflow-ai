const router = require("express").Router();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

// ======================
// EVALUATE ANSWER
// ======================

router.post("/", async (req, res) => {

  try {

    const {
      question,
      answer,
      category,
    } = req.body;

    let prompt = "";

    // ======================
    // DSA CHECK
    // ======================

    if (category === "dsa") {

      prompt = `
You are an expert DSA interviewer.

Question:
${question}

Candidate Code:
${answer}

Evaluate:

1. Is solution correct?
2. Time Complexity
3. Space Complexity
4. Optimization Suggestions
5. Interview Feedback
6. Score out of 10

Give professional interview feedback.
`;

    }

    // ======================
    // CORE SUBJECT CHECK
    // ======================

    else {

      prompt = `
You are a technical interviewer.

Question:
${question}

Candidate Answer:
${answer}

Evaluate:

1. Correctness
2. Missing Concepts
3. Technical Accuracy
4. Interview Feedback
5. Score out of 10

Give professional feedback.
`;

    }

    // ======================
    // AI RESPONSE
    // ======================

    const completion =
      await groq.chat.completions.create({

        model:
          "llama-3.3-70b-versatile",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

      });

    res.json({
      feedback:
        completion.choices[0].message.content,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: "Evaluation Failed ❌",
    });

  }

});

module.exports = router;