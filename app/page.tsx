"use client";

import { useState } from "react";
import { Header } from "@/components/Header";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ListingGrid } from "@/components/ListingGrid";
import { MobileNav } from "@/components/MobileNav";
import { TripConcierge } from "@/components/TripConcierge";

export default function HomePage() {
  const [category, setCategory] = useState("all");
  return (
    <>
      <Header />
      <CategoryFilter active={category} onChange={setCategory} />
      <main>
        <TripConcierge />
        <ListingGrid category={category} />
      </main>
      <MobileNav />
    </>
  );
}
