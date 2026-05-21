const router = require("express").Router();

const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

router.post("/", async (req, res) => {

  try {

    const { type, company, role } = req.body;

    let prompt = "";

    // ======================
    // CATEGORY
    // ======================

    if (type === "core") {

      prompt = `
      Ask one core CS interview question
      for ${role} role at ${company}.
      Focus on DBMS, OS, CN, OOPs.
      Return only question.
      `;

    }

    else if (type === "dsa") {

      prompt = `
      Ask one DSA interview question
      for ${role} role at ${company}.
      Return only question.
      `;

    }

    else if (type === "system") {

      prompt = `
      Ask one System Design interview question
      for ${role} role at ${company}.
      Return only question.
      `;

    }

    // ======================
    // AI GENERATION
    // ======================

   const completion =
  await groq.chat.completions.create({

    model: "llama-3.3-70b-versatile",

    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],

  });

    const question =
      completion.choices[0].message.content;

    res.json({
      question,
    });

  } catch (err) {

    console.log(err);

    res.status(500).json({
      message: err.message,
    });

  }

});

module.exports = router;