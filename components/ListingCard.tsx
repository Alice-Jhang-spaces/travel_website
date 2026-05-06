import { Star } from "lucide-react";
import type { Listing } from "@/lib/listings";
import { ImageCarousel } from "./ImageCarousel";
import { HeartButton } from "./HeartButton";

export function ListingCard({ listing }: { listing: Listing }) {
  return (
    <a href="#" className="group block">
      <div className="relative">
        <HeartButton id={listing.id} />
        <ImageCarousel images={listing.images} alt={listing.title} />
      </div>
      <div className="mt-3 space-y-0.5 text-sm">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-hof truncate">{listing.location}</h3>
          <span className="flex shrink-0 items-center gap-1">
            <Star className="h-3.5 w-3.5 fill-current" />
            {listing.rating.toFixed(2)}
          </span>
        </div>
        <p className="text-foggy">{listing.distance}</p>
        <p className="text-foggy">{listing.dates}</p>
        <p className="pt-1 text-hof">
          <span className="font-semibold">${listing.price}</span>
          <span className="text-foggy"> night</span>
        </p>
      </div>
    </a>
  );
}

export function ListingCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="aspect-square w-full rounded-xl bg-gray-200" />
      <div className="mt-3 space-y-2">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
        <div className="h-3 w-2/3 rounded bg-gray-200" />
        <div className="h-4 w-1/3 rounded bg-gray-200" />
      </div>
    </div>
  );
}
