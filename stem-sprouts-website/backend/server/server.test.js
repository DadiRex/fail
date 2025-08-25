import { describe, it, expect } from "vitest";
import request from "supertest";
import express from "express";
// import router from "./server.js"; // if you export app, otherwise spin up against localhost

describe("health", () => {
  it("GET /healthz", async () => {
    const res = await request("http://localhost:3000").get("/healthz");
    expect(res.status).toBe(200);
    expect(res.body.ok).toBe(true);
  });
});

// For /api/character and /api/story you can mock OpenAI in unit tests,
// but an integration test is also fine once a key is present. 