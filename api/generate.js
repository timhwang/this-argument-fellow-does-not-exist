import Anthropic from "@anthropic-ai/sdk";
import { generateBio } from "./_shared.js";

export default async function handler(req, res) {
  // CORS headers for GitHub Pages frontend
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { image, media_type } = req.body;
  if (!image || !media_type) {
    return res.status(400).json({ error: "Missing image or media_type" });
  }

  try {
    const client = new Anthropic();
    const bio = await generateBio(client, image, media_type);
    res.json({ bio });
  } catch (error) {
    console.error("Claude API error:", error);
    res.status(500).json({ error: "Failed to generate bio" });
  }
}
