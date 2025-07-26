// routes/llm.js
const express = require("express");
const router = express.Router();
const axios = require("axios");

// POST /api/llm/detect
router.post("/detect", async (req, res) => {
  const { text } = req.body;

  if (!text) {
    return res.status(400).json({ error: "Review text is required" });
  }

  try {
    const mistralResponse = await axios.post(
      "http://localhost:5001/v1/chat/completions",
      {
        messages: [
          {
            role: "system",
            content:
              "You are a strict review moderator. Only reply with 'real' or 'fake'. Do not explain. No extra words. If unsure, still make your best guess and choose one.",
          },
          {
            role: "user",
            content: text,
          },
        ],
        temperature: 0.1,
        max_tokens: 1,
        stop: ["\n"], // Ensure it stops after one word
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const raw = mistralResponse.data.choices[0]?.message?.content?.trim().toLowerCase();
    const label = raw === "real" || raw === "fake" ? raw : "pending";

    // Confidence scoring (optional enhancement)
    const confidence = label === "real" || label === "fake" ? 1 : 0.5;

    return res.json({ classification: label, confidence });
  } catch (err) {
    console.error("LLM error:", err.message);
    return res.status(500).json({ error: "LLM classification failed" });
  }
});

module.exports = router;

