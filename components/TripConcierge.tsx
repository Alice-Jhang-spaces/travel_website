"use client";

import { useState } from "react";
import Image from "next/image";
import { Sparkles, Loader2, Star } from "lucide-react";
import type { Listing } from "@/lib/listings";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

type Recommendation = { listing: Listing; reason: string };
type RecommendResponse = { summary: string; recommendations: Recommendation[] };

const SUGGESTIONS = [
  "Beachfront with a pool, under $400/night",
  "Romantic European getaway with vineyards nearby",
  "Cozy cabin for ski season",
  "Somewhere peaceful and remote for a writing retreat",
];

export function TripConcierge() {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<RecommendResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const ask = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setError(null);
    setResult(null);
    try {
      const r = await fetch(`${API_BASE}/api/recommend`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? `HTTP ${r.status}`);
      setResult(data);
    } catch (e) {
      setError(e instanceof Error ? e.message : String(e));
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="mx-auto max-w-[1760px] px-6 lg:px-20 pt-6">
      <div className="rounded-2xl border border-gray-200 bg-gradient-to-br from-rose-50 via-white to-amber-50 p-5 shadow-airbnb-sm">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-rausch text-white">
            <Sparkles className="h-4 w-4" />
          </span>
          <h2 className="text-lg font-semibold text-hof">Ask the AI travel concierge</h2>
        </div>
        <p className="mt-1 text-sm text-foggy">
          Describe your ideal trip in plain English. Claude picks 3–5 listings from the catalog.
        </p>

        <form
          className="mt-3 flex flex-col gap-2 sm:flex-row"
          onSubmit={(e) => {
            e.preventDefault();
            ask(query);
          }}
        >
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="e.g., quiet beach with great food, mid-May, under $500/night"
            className="flex-1 rounded-full border border-gray-200 bg-white px-5 py-3 text-sm focus:border-rausch focus:outline-none"
          />
          <button
            type="submit"
            disabled={loading || !query.trim()}
            className="flex items-center justify-center gap-2 rounded-full bg-rausch px-6 py-3 text-sm font-semibold text-white transition-opacity disabled:opacity-50"
          >
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Sparkles className="h-4 w-4" />}
            {loading ? "Thinking…" : "Recommend"}
          </button>
        </form>

        {!result && !loading && !error && (
          <div className="mt-3 flex flex-wrap gap-2">
            {SUGGESTIONS.map((s) => (
              <button
                key={s}
                onClick={() => {
                  setQuery(s);
                  ask(s);
                }}
                className="rounded-full border border-gray-200 bg-white px-3 py-1.5 text-xs text-foggy hover:border-gray-400 hover:text-hof"
              >
                {s}
              </button>
            ))}
          </div>
        )}

        {error && (
          <div className="mt-3 rounded-xl border border-rose-200 bg-rose-50 p-3 text-sm text-rose-700">
            {error}
            {error.includes("ANTHROPIC_API_KEY") && (
              <p className="mt-1 text-xs text-rose-600">
                Set <code className="rounded bg-rose-100 px-1">ANTHROPIC_API_KEY</code> in the api server env and restart `npm run dev`.
              </p>
            )}
          </div>
        )}

        {result && (
          <div className="mt-4">
            <p className="text-sm text-hof">{result.summary}</p>
            <div className="mt-3 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {result.recommendations.map(({ listing, reason }) => (
                <a
                  key={listing.id}
                  href="#"
                  className="group flex gap-3 rounded-xl border border-gray-200 bg-white p-3 transition-shadow hover:shadow-airbnb-sm"
                >
                  <div className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg">
                    <Image
                      src={listing.images[0]}
                      alt={listing.title}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1 text-sm">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-hof truncate">{listing.location}</h3>
                      <span className="flex shrink-0 items-center gap-1 text-xs">
                        <Star className="h-3 w-3 fill-current" />
                        {listing.rating.toFixed(2)}
                      </span>
                    </div>
                    <p className="text-xs text-hof">
                      <span className="font-semibold">${listing.price}</span>
                      <span className="text-foggy"> / night</span>
                    </p>
                    <p className="mt-1 line-clamp-3 text-xs text-foggy">{reason}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
