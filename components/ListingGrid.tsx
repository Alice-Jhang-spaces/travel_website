"use client";

import { useEffect, useState } from "react";
import type { Listing } from "@/lib/listings";
import { ListingCard, ListingCardSkeleton } from "./ListingCard";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE ?? "http://localhost:3001";

export function ListingGrid({ category }: { category: string }) {
  const [loading, setLoading] = useState(true);
  const [listings, setListings] = useState<Listing[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    setError(null);
    fetch(`${API_BASE}/api/listings?category=${encodeURIComponent(category)}`)
      .then((r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        return r.json();
      })
      .then((data: { results: Listing[] }) => {
        if (!cancelled) setListings(data.results);
      })
      .catch((e) => {
        if (!cancelled) setError(String(e));
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, [category]);

  return (
    <div className="mx-auto max-w-[1760px] px-6 lg:px-20 py-8 pb-24 md:pb-8">
      {loading ? (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {Array.from({ length: 10 }).map((_, i) => (
            <ListingCardSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">Couldn’t reach the API</h2>
          <p className="mt-2 text-foggy">{error}</p>
        </div>
      ) : listings.length === 0 ? (
        <div className="py-20 text-center">
          <h2 className="text-2xl font-semibold">No exact matches</h2>
          <p className="mt-2 text-foggy">Try changing or removing some of your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {listings.map((l) => (
            <ListingCard key={l.id} listing={l} />
          ))}
        </div>
      )}
    </div>
  );
}
