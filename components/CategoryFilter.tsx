"use client";

import { useRef, useState, useEffect } from "react";
import {
  Globe, Mountain, Waves, TreePine, Home, Castle, Droplets,
  Palmtree, Sailboat, Palette, Wheat, Flame, Snowflake, Map,
  ChevronLeft, ChevronRight, SlidersHorizontal,
} from "lucide-react";
import { CATEGORIES } from "@/lib/listings";

const ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe, Mountain, Waves, TreePine, Home, Castle, Droplets,
  Palmtree, Sailboat, Palette, Wheat, Flame, Snowflake, Map,
};

export function CategoryFilter({
  active,
  onChange,
}: {
  active: string;
  onChange: (id: string) => void;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(true);

  const update = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 4);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  };

  useEffect(() => {
    update();
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      el.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  const scroll = (dir: -1 | 1) => {
    scrollRef.current?.scrollBy({ left: dir * 400, behavior: "smooth" });
  };

  return (
    <div className="sticky top-[88px] z-40 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1760px] items-center gap-4 px-6 lg:px-20 py-3">
        <div className="relative flex-1 min-w-0">
          {canLeft && (
            <button
              onClick={() => scroll(-1)}
              className="absolute left-0 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-airbnb-sm hover:scale-105 transition-transform"
              aria-label="Scroll left"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          <div
            ref={scrollRef}
            className="no-scrollbar flex items-center gap-2 overflow-x-auto px-8"
          >
            {CATEGORIES.map((c) => {
              const Icon = ICONS[c.icon] ?? Globe;
              const isActive = active === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => onChange(c.id)}
                  className={`group flex shrink-0 flex-col items-center gap-2 border-b-2 pb-3 pt-2 px-3 text-xs font-medium transition-colors ${
                    isActive
                      ? "border-black text-black"
                      : "border-transparent text-foggy hover:border-gray-300 hover:text-black"
                  }`}
                >
                  <Icon className="h-6 w-6" />
                  <span className="whitespace-nowrap">{c.label}</span>
                </button>
              );
            })}
          </div>
          {canRight && (
            <button
              onClick={() => scroll(1)}
              className="absolute right-0 top-1/2 z-10 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-white shadow-airbnb-sm hover:scale-105 transition-transform"
              aria-label="Scroll right"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </div>
        <button className="flex shrink-0 items-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-xs font-semibold hover:border-gray-400">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </button>
      </div>
    </div>
  );
}
