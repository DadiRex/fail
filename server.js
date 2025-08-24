// server.js (ESM, hardened)
import express from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import pino from "pino";
import { OpenAI } from "openai";
import { z } from "zod";

/* ---------- setup ---------- */
const log = pino({ level: process.env.LOG_LEVEL || "info" });
const app = express();
app.use(helmet({ contentSecurityPolicy: false }));
app.use(cors({ origin: true }));
app.use(compression());
app.use(express.json({ limit: "4mb" }));
app.use(
  rateLimit({
    windowMs: 60 * 1000,
    max: 60,
    standardHeaders: true,
    legacyHeaders: false,
  })
);

if (!process.env.OPENAI_API_KEY) {
  log.warn("OPENAI_API_KEY not set; OpenAI endpoints will fail until you set it.");
}

// Defer OpenAI client creation until needed
let openai = null;
let MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini";

function getOpenAI() {
  if (!openai) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY not set");
    }
    openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
  }
  return openai;
}

/* ---------- schemas ---------- */
const CharacterReq = z.object({
  prompt: z.string().min(1).default("Create a kid-friendly STEM character."),
  audience: z.string().default("ages 6–10"),
  style: z.string().default("bright 2D cartoon"),
  constraints: z.string().default("original; no resemblance to existing IP"),
});

const CharacterRes = z.object({
  name: z.string(),
  species_or_type: z.string(),
  visual_description: z.string(),
  personality: z.string(),
  catchphrases: z.array(z.string()).optional().default([]),
  strengths: z.array(z.string()).optional().default([]),
  quirks: z.array(z.string()).optional().default([]),
  stem_domain: z.string(),
  color_palette: z.array(z.string()).optional().default([]),
  do_not_copy: z.string(),
});

const StoryReq = z.object({
  title: z.string().default("Adventure in Volcano Valley"),
  topic: z.string().default("volcano science"),
  target_age: z.string().default("6–10"),
  minutes: z.number().int().min(1).max(15).default(3),
  characters: z.array(z.any()).default([]),
  moral: z.string().default("Curiosity + safety"),
  educational_goals: z.array(z.string()).default([
    "Basic volcano formation",
    "Safety around natural phenomena",
    "Scientific observation skills",
  ]),
});

const StoryRes = z.object({
  title: z.string(),
  opening: z.string(),
  scenes: z.array(z.object({
    setting: z.string(),
    action: z.string(),
    dialogue: z.string(),
    duration: z.number(),
  })),
  closing: z.string(),
  moral: z.string(),
  educational_goals: z.array(z.string()),
  total_duration: z.number(),
});

/* ---------- helpers ---------- */
function sendSSEHeaders(res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream; charset=utf-8",
    "Cache-Control": "no-cache, no-transform",
    "Connection": "keep-alive",
    "X-Accel-Buffering": "no" // prevents some proxies from buffering
  });
}

function safeParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch {
    return null;
  }
}

/* ---------- endpoints ---------- */
app.get("/healthz", (req, res) => {
  res.json({ status: "healthy", timestamp: new Date().toISOString() });
});

app.get("/__selfcheck", (req, res) => {
  res.json({
    status: "ok",
    model: MODEL,
    hasOpenAI: !!process.env.OPENAI_API_KEY,
    timestamp: new Date().toISOString(),
  });
});

app.post("/api/character", async (req, res) => {
  try {
    const body = CharacterReq.parse(req.body);
    const openaiClient = getOpenAI();
    
    const completion = await openaiClient.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `You are a character designer for STEM education. Create original, engaging characters that inspire curiosity about science, technology, engineering, and math.`,
        },
        {
          role: "user",
          content: `Design a character with these requirements: ${body.prompt}. Target audience: ${body.audience}. Style: ${body.style}. Constraints: ${body.constraints}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    const parsed = safeParseJSON(content);
    
    if (!parsed) {
      throw new Error("Failed to parse OpenAI response");
    }

    const result = CharacterRes.parse(parsed);
    res.json(result);
  } catch (error) {
    log.error({ error: error.message }, "Character generation failed");
    res.status(500).json({ error: "Character generation failed", details: error.message });
  }
});

app.post("/api/story", async (req, res) => {
  try {
    const body = StoryReq.parse(req.body);
    const openaiClient = getOpenAI();
    
    const completion = await openaiClient.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `You are a storyteller for STEM education. Create engaging, educational stories that make complex concepts accessible to children.`,
        },
        {
          role: "user",
          content: `Create a story about ${body.topic} for ages ${body.target_age}. Duration: ${body.minutes} minutes. Include these characters: ${body.characters.join(", ")}. Moral: ${body.moral}. Educational goals: ${body.educational_goals.join(", ")}`,
        },
      ],
      response_format: { type: "json_object" },
    });

    const content = completion.choices[0].message.content;
    const parsed = safeParseJSON(content);
    
    if (!parsed) {
      throw new Error("Failed to parse OpenAI response");
    }

    const result = StoryRes.parse(parsed);
    res.json(result);
  } catch (error) {
    log.error({ error: error.message }, "Story generation failed");
    res.status(500).json({ error: "Story generation failed", details: error.message });
  }
});

app.post("/api/ask", async (req, res) => {
  try {
    const { question } = req.body;
    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    const openaiClient = getOpenAI();
    sendSSEHeaders(res);

    const stream = await openaiClient.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: "You are a friendly STEM tutor for kids. Keep answers simple, engaging, and age-appropriate.",
        },
        { role: "user", content: question },
      ],
      stream: true,
    });

    for await (const chunk of stream) {
      const content = chunk.choices[0]?.delta?.content;
      if (content) {
        res.write(`data: ${JSON.stringify({ content })}\n\n`);
      }
    }
    res.write("data: [DONE]\n\n");
    res.end();
  } catch (error) {
    log.error({ error: error.message }, "Ask endpoint failed");
    res.status(500).json({ error: "Ask endpoint failed", details: error.message });
  }
});

/* ---------- error handling ---------- */
app.use((error, req, res, next) => {
  log.error({ error: error.message, stack: error.stack }, "Unhandled error");
  res.status(500).json({ error: "Internal server error" });
});

/* ---------- start server ---------- */
// --- harden process lifecycle logging ---
process.on("unhandledRejection", (reason) => {
  console.error("UnhandledRejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.error("UncaughtException:", err);
});

// --- start (Railway) ---
const PORT = Number(process.env.PORT || 0);
const HOST = "0.0.0.0";
app.listen(PORT, HOST, () => {
  log.info(`Server running on http://${HOST}:${PORT}`);
});
