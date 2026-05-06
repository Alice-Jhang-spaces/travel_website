import { Search, Heart, User } from "lucide-react";

export function MobileNav() {
  return (
    <nav className="md:hidden fixed bottom-0 inset-x-0 z-50 grid grid-cols-3 border-t border-gray-200 bg-white">
      <a className="flex flex-col items-center gap-1 py-2 text-rausch">
        <Search className="h-5 w-5" />
        <span className="text-[10px] font-medium">Explore</span>
      </a>
      <a className="flex flex-col items-center gap-1 py-2 text-foggy">
        <Heart className="h-5 w-5" />
        <span className="text-[10px] font-medium">Wishlists</span>
      </a>
      <a className="flex flex-col items-center gap-1 py-2 text-foggy">
        <User className="h-5 w-5" />
        <span className="text-[10px] font-medium">Log in</span>
      </a>
    </nav>
  );
}
