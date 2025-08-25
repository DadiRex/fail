// server.js (ESM)
import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import { OpenAI } from "openai";

const app = express();

app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true }));
app.use(compression());
app.use(express.json({ limit: "4mb" }));

if (!process.env.OPENAI_API_KEY) {
  console.warn("WARNING: OPENAI_API_KEY is not set. Set it before calling /api/ask.");
}
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Prefer a safe, widely-available default model; allow override via env
const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

// ---------------- Health ----------------
app.get("/healthz", (_, res) => res.json({ ok: true }));

// ---------------- Ask (Chat Completions + SSE streaming) ----------------
app.post("/api/ask", async (req, res) => {
  const { question, child_age = "8-12" } = req.body || {};
  if (!question || typeof question !== "string") {
    return res.status(400).json({ error: "question is required" });
  }

  try {
    // SSE headers
    res.writeHead(200, {
      "Content-Type": "text/event-stream; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      "Connection": "keep-alive",
    });

    // Chat Completions streaming (SDK-supported)
    const stream = await openai.chat.completions.create({
      model: MODEL,
      stream: true,
      messages: [
        {
          role: "system",
          content:
            "You are a STEM-for-kids helper for parents. Keep answers friendly, concise, age-appropriate. If chemicals/heat are involved, include a 1-line safety note and 'adult supervision'.",
        },
        {
          role: "user",
          content: `QUESTION: ${question}\nCHILD_AGE: ${child_age}`,
        },
      ],
      // You can tune temperature / max_tokens if desired
      temperature: 0.7,
      // max_tokens: 1000,
    });

    // Stream tokens as they arrive
    for await (const part of stream) {
      const delta = part?.choices?.[0]?.delta?.content;
      if (delta) res.write(delta);
    }

    res.end();
  } catch (e) {
    console.error("[/api/ask error]", e?.status, e?.message, e?.response?.data);
    if (!res.headersSent) {
      return res.status(500).json({ error: "ask_failed", status: e?.status ?? null });
    }
    try {
      res.end("\n[stream closed due to error]");
    } catch {}
  }
});

// ---------------- Start ----------------
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`STEM helper running at http://localhost:${PORT}`)); 
