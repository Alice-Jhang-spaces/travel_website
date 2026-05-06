"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";

export function HeartButton({ id }: { id: string }) {
  const [liked, setLiked] = useState(false);
  return (
    <motion.button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        setLiked((v) => !v);
      }}
      whileTap={{ scale: 0.85 }}
      whileHover={{ scale: 1.08 }}
      className="absolute right-3 top-3 z-10"
      aria-label={liked ? "Remove from wishlist" : "Add to wishlist"}
      aria-pressed={liked}
      data-listing={id}
    >
      <Heart
        className={`h-7 w-7 drop-shadow-[0_1px_2px_rgba(0,0,0,0.4)] transition-colors ${
          liked ? "fill-rausch text-rausch" : "fill-black/40 text-white"
        }`}
        strokeWidth={2}
      />
    </motion.button>
  );
}
