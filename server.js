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
    "Basic volcano structure",
    "Safety around volcanoes",
    "Scientific observation",
  ]),
});

const StoryRes = z.object({
  title: z.string(),
  opening: z.string(),
  scenes: z.array(z.object({
    description: z.string(),
    dialogue: z.string(),
    visual_notes: z.string(),
    duration_seconds: z.number(),
  })),
  closing: z.string(),
  total_duration: z.number(),
  educational_points: z.array(z.string()),
  safety_notes: z.array(z.string()),
});

/* ---------- helpers ---------- */
function sendSSEHeaders(res) {
  res.writeHead(200, {
    "Content-Type": "text/event-stream",
    "Cache-Control": "no-cache",
    "Connection": "keep-alive",
  });
}

function safeParseJSON(str) {
  try {
    return JSON.parse(str);
  } catch (e) {
    log.warn("Failed to parse JSON:", str);
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
    const body = safeParseJSON(req.body);
    if (!body) {
      return res.status(400).json({ error: "Invalid JSON" });
    }

    const validated = CharacterReq.parse(body);
    const openaiClient = getOpenAI();

    const completion = await openaiClient.chat.completions.create({
      model: MODEL,
      messages: [
        {
          role: "system",
          content: `You are a STEM character designer. Create engaging, educat
