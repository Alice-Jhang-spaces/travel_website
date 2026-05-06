###Travel Website — an Airbnb-style booking site with a Claude travel concierge
A pixel-faithful Airbnb homepage clone, plus an AI agent that recommends listings from natural-language travel briefs.

What it is
A full-stack web app where users browse listings (location, image carousel, price, rating) and ask an LLM concierge for personalized recommendations in plain English — e.g. "cozy cabin for ski season" or "romantic European getaway with vineyards nearby". Claude returns 3–5 matching listings from the catalog with one-line reasoning per pick.

Stack
Frontend — Next.js 16 (App Router, Turbopack), React 18, Tailwind CSS, Framer Motion, lucide-react.
Backend — Express (TypeScript via tsx), CORS, dotenv.
AI — Claude Opus 4.7 via the official @anthropic-ai/sdk, with adaptive thinking and structured JSON output (output_config.format + a JSON schema) so the frontend renders typed cards.
Dev tooling — concurrently runs the web (:3000) and API (:3001) under one npm run dev. .claude/launch.json defines web, api, and combined dev configurations.
Features
Sticky search bar that collapses on scroll (Framer Motion layout animation).
Horizontal category filter (Beach, Cabins, Castles, Pools, Skiing, Tropical, Lakefront, Design, Countryside, Trending, Islands…) with chevron scroll buttons.
Responsive listing grid with image carousels, lazy-loaded next/image, and skeleton loading states on category switches.
Wishlist heart with Framer Motion tap animation.
Mobile bottom nav (Explore / Wishlists / Log in) on small screens.
AI Travel Concierge — coral-gradient panel above the grid. Type a request, click Recommend, and Claude returns three small recommendation cards with the listing image, location, rating, price, and a Claude-written reason for each pick.
The interesting bit — the Claude integration
The backend (server/index.ts) sends Claude:

A system prompt containing the full listings catalog as JSON (so the model sees the available inventory).
The user's free-form query as the user message.
A JSON schema via output_config.format constraining the response shape:
{ "summary": "string", "recommendations": [{ "listing_id": "string", "reason": "string" }] }
Adaptive thinking (thinking: { type: "adaptive" }) so Claude reasons about fit before answering.
The server then enriches each listing_id with the full record before returning to the client. Typical response time: ~6–10 seconds for an Opus 4.7 call with adaptive thinking.

Run it
git clone git@github.com:Alice-Jhang-spaces/travel_website.git
cd travel_website
npm install
cp .env.example .env          # then paste your ANTHROPIC_API_KEY
npm run dev
# → web on http://localhost:3000, api on http://localhost:3001
Contact
Developed by Alice Jhang.
Feel free to reach out for collaborations or feedback!
