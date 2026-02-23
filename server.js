const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });

const app = express();
const PORT = process.env.PORT || 5000;
const HF_API_KEY = process.env.HF_API_KEY;
const HF_MODEL =
  process.env.HF_MODEL ||
  process.env.MODEL ||
  "meta-llama/Llama-3.1-8B-Instruct";

app.use(cors());
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname, "public")));

async function callRouterChatCompletions(messages, maxTokens, temperature) {
  const response = await fetch("https://router.huggingface.co/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${HF_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: HF_MODEL,
      messages,
      max_tokens: maxTokens,
      temperature,
      stream: false
    })
  });

  const data = await response.json();
  if (!response.ok) {
    const message = data?.error?.message || data?.error || "Router call failed";
    throw new Error(message);
  }

  const content = data?.choices?.[0]?.message?.content;
  if (!content) {
    throw new Error("Empty response from model.");
  }
  return content;
}

app.post("/api/chat", async (req, res) => {
  try {
    if (!HF_API_KEY) {
      return res.status(500).json({ error: "HF_API_KEY is missing in environment variables." });
    }

    const { messages, maxTokens = 512, temperature = 0.7 } = req.body || {};

    if (!Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: "messages must be a non-empty array." });
    }

    const reply = await callRouterChatCompletions(messages, maxTokens, temperature);

    res.json({ reply, model: HF_MODEL });
  } catch (error) {
    res.status(500).json({ error: error.message || "Failed to generate response." });
  }
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", model: HF_MODEL });
});

app.listen(PORT, () => {
  console.log(`MindGPT running at http://localhost:${PORT}`);
});
