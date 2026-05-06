import "dotenv/config";
import express from "express";
import cors from "cors";
import Anthropic from "@anthropic-ai/sdk";
import { LISTINGS, CATEGORIES } from "../lib/listings";

const app = express();
const PORT = Number(process.env.API_PORT ?? 3001);

app.use(cors());
app.use(express.json());

const anthropic = process.env.ANTHROPIC_API_KEY ? new Anthropic() : null;
if (!anthropic) {
  console.warn("[api] ANTHROPIC_API_KEY not set — /api/recommend will return 503");
}

const RECOMMEND_SYSTEM = `You are a travel concierge for an Airbnb-style platform. \
Recommend 3-5 listings from the catalog below that best match the traveler's request. \
Be concrete: cite location, price, vibe, and why each pick fits. Skip listings that don't fit \
rather than padding the list. If the request is vague, default to a varied mix.

Catalog (JSON):
${JSON.stringify(LISTINGS.map((l) => ({
  id: l.id,
  location: l.location,
  category: l.category,
  price_per_night_usd: l.price,
  rating: l.rating,
  available_dates: l.dates,
})), null, 2)}`;

const RECOMMEND_SCHEMA = {
  type: "object",
  properties: {
    summary: { type: "string", description: "One-sentence intro framing the picks." },
    recommendations: {
      type: "array",
      items: {
        type: "object",
        properties: {
          listing_id: { type: "string", description: "ID from the catalog." },
          reason: { type: "string", description: "Why this listing fits, 1-2 sentences." },
        },
        required: ["listing_id", "reason"],
        additionalProperties: false,
      },
    },
  },
  required: ["summary", "recommendations"],
  additionalProperties: false,
} as const;

app.post("/api/recommend", async (req, res) => {
  if (!anthropic) {
    return res.status(503).json({ error: "ANTHROPIC_API_KEY not configured on the server" });
  }
  const { query } = req.body as { query?: string };
  if (!query || typeof query !== "string" || !query.trim()) {
    return res.status(400).json({ error: "query (string) required" });
  }

  try {
    const response = await anthropic.messages.create({
      model: "claude-opus-4-7",
      max_tokens: 4096,
      thinking: { type: "adaptive" },
      system: RECOMMEND_SYSTEM,
      messages: [{ role: "user", content: query }],
      output_config: { format: { type: "json_schema", schema: RECOMMEND_SCHEMA } },
    });

    const textBlock = response.content.find(
      (b): b is Anthropic.TextBlock => b.type === "text",
    );
    if (!textBlock) {
      return res.status(502).json({ error: "no text block in model response" });
    }

    const parsed = JSON.parse(textBlock.text) as {
      summary: string;
      recommendations: { listing_id: string; reason: string }[];
    };

    const enriched = parsed.recommendations
      .map((r) => {
        const listing = LISTINGS.find((l) => l.id === r.listing_id);
        return listing ? { listing, reason: r.reason } : null;
      })
      .filter((x): x is { listing: typeof LISTINGS[number]; reason: string } => x !== null);

    res.json({
      summary: parsed.summary,
      recommendations: enriched,
      usage: response.usage,
    });
  } catch (err) {
    console.error("[recommend]", err);
    if (err instanceof Anthropic.APIError) {
      return res.status(err.status ?? 500).json({ error: err.message });
    }
    res.status(500).json({ error: String(err) });
  }
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, uptime: process.uptime() });
});

app.get("/api/categories", (_req, res) => {
  res.json(CATEGORIES);
});

app.get("/api/listings", (req, res) => {
  const category = typeof req.query.category === "string" ? req.query.category : "all";
  const results =
    category === "all"
      ? LISTINGS
      : LISTINGS.filter((l) => l.category === category);
  res.json({ count: results.length, results });
});

app.get("/api/listings/:id", (req, res) => {
  const listing = LISTINGS.find((l) => l.id === req.params.id);
  if (!listing) return res.status(404).json({ error: "not_found" });
  res.json(listing);
});

const wishlists = new Map<string, Set<string>>();
app.post("/api/wishlist/:userId/toggle", (req, res) => {
  const { userId } = req.params;
  const { listingId } = req.body as { listingId?: string };
  if (!listingId) return res.status(400).json({ error: "listingId required" });
  const set = wishlists.get(userId) ?? new Set<string>();
  if (set.has(listingId)) set.delete(listingId);
  else set.add(listingId);
  wishlists.set(userId, set);
  res.json({ liked: set.has(listingId), wishlist: [...set] });
});

app.listen(PORT, () => {
  console.log(`[api] listening on http://localhost:${PORT}`);
});
