"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [i, setI] = useState(0);
  const [hover, setHover] = useState(false);

  const go = (dir: -1 | 1, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setI((v) => (v + dir + images.length) % images.length);
  };

  return (
    <div
      className="group relative aspect-square w-full overflow-hidden rounded-xl bg-gray-100"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Image
        src={images[i]}
        alt={alt}
        fill
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        className="object-cover transition-transform duration-300 group-hover:scale-105"
        loading="lazy"
      />

      {hover && images.length > 1 && (
        <>
          {i > 0 && (
            <button
              onClick={(e) => go(-1, e)}
              className="absolute left-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-airbnb-sm hover:scale-110 transition-transform"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
          )}
          {i < images.length - 1 && (
            <button
              onClick={(e) => go(1, e)}
              className="absolute right-2 top-1/2 -translate-y-1/2 flex h-8 w-8 items-center justify-center rounded-full bg-white/90 shadow-airbnb-sm hover:scale-110 transition-transform"
              aria-label="Next image"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          )}
        </>
      )}

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, idx) => (
          <span
            key={idx}
            className={`h-1.5 w-1.5 rounded-full transition-all ${
              idx === i ? "bg-white" : "bg-white/60"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
