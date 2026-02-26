import { readFileSync } from "fs";
import Anthropic from "@anthropic-ai/sdk";
import express from "express";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { generateBio } from "./api/_shared.js";

// Load .env file for local dev
try {
  const envFile = readFileSync(join(dirname(fileURLToPath(import.meta.url)), ".env"), "utf8");
  for (const line of envFile.split("\n")) {
    const [key, ...vals] = line.split("=");
    if (key && vals.length) process.env[key.trim()] = vals.join("=").trim();
  }
} catch {}


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
app.use(express.json({ limit: "10mb" }));
app.use(express.static(join(__dirname, "public")));

// Also serve root index.html for local dev
app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/api/generate", async (req, res) => {
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
    res.status(500).json({ error: "Failed to generate bio. Check your ANTHROPIC_API_KEY." });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
