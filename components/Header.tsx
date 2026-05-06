"use client";

import { useEffect, useState } from "react";
import { Search, Globe, Menu, User } from "lucide-react";
import { motion } from "framer-motion";

export function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-[1760px] items-center justify-between px-6 lg:px-20 py-4">
        <a href="/" className="flex items-center gap-1 text-rausch font-bold text-2xl">
          <svg viewBox="0 0 32 32" className="h-8 w-8 fill-current" aria-hidden>
            <path d="M16 1c-2.5 0-4.5 2-4.5 4.5 0 1 .3 2 1 3.2l.4.7 2.4 4.3.5.8c2.4 4.5 3.4 7.5 3.4 9.6 0 .9-.2 1.7-.6 2.4-.4.7-1 1.2-1.7 1.6-.7.4-1.5.5-2.4.5-1.3 0-2.4-.4-3.3-1.2-.9-.8-1.4-1.8-1.6-3v-.3c0-.5.4-.9.9-.9s.9.4.9.9v.2c.1.7.4 1.3.9 1.7.5.5 1.2.7 2 .7.6 0 1.1-.1 1.5-.3.4-.2.7-.5.9-.9.2-.4.3-.9.3-1.4 0-1.7-.9-4.3-3.1-8.5L11 11c-.7-1.3-1.1-2.4-1.1-3.5C9.9 4.4 12.7 1.6 16 1z"/>
          </svg>
          <span className="hidden sm:inline">airbnb</span>
        </a>

        <motion.div
          layout
          className="hidden md:flex"
          transition={{ type: "spring", stiffness: 220, damping: 26 }}
        >
          {scrolled ? (
            <button className="flex items-center gap-2 rounded-full border border-gray-200 px-2 py-2 pl-6 shadow-airbnb-sm hover:shadow-airbnb transition-shadow">
              <span className="text-sm font-semibold">Anywhere</span>
              <span className="h-5 w-px bg-gray-200" />
              <span className="text-sm font-semibold">Any week</span>
              <span className="h-5 w-px bg-gray-200" />
              <span className="text-sm text-foggy">Add guests</span>
              <span className="ml-2 flex h-8 w-8 items-center justify-center rounded-full bg-rausch text-white">
                <Search className="h-4 w-4" />
              </span>
            </button>
          ) : (
            <div className="flex flex-col items-center gap-3">
              <nav className="flex items-center gap-6 text-sm font-medium">
                <a className="border-b-2 border-black pb-2">Stays</a>
                <a className="text-foggy pb-2">Experiences</a>
              </nav>
              <button className="flex items-center rounded-full border border-gray-200 shadow-airbnb-sm hover:shadow-airbnb transition-shadow">
                <span className="px-6 py-3.5 text-sm font-semibold border-r border-gray-200">Anywhere</span>
                <span className="px-6 py-3.5 text-sm font-semibold border-r border-gray-200">Any week</span>
                <span className="px-6 py-3.5 text-sm text-foggy">Add guests</span>
                <span className="m-2 flex h-8 w-8 items-center justify-center rounded-full bg-rausch text-white">
                  <Search className="h-4 w-4" />
                </span>
              </button>
            </div>
          )}
        </motion.div>

        <div className="flex items-center gap-2">
          <a className="hidden md:inline rounded-full px-4 py-3 text-sm font-medium hover:bg-gray-100">
            Airbnb your home
          </a>
          <button className="hidden md:inline-flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100" aria-label="Language">
            <Globe className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 rounded-full border border-gray-200 px-3 py-1.5 hover:shadow-airbnb-sm transition-shadow">
            <Menu className="h-4 w-4" />
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-foggy text-white">
              <User className="h-4 w-4" />
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
