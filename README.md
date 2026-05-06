# Travel Website — Airbnb-Style Booking Platform with Claude AI Concierge

A modern Airbnb-inspired travel booking platform powered by Claude Opus 4.7. Users can browse curated travel listings and receive AI-generated recommendations through natural-language travel requests.

---

#  Features

##  Airbnb-Style UI

- Pixel-faithful Airbnb-inspired homepage
- Responsive design for desktop and mobile
- Sticky animated search bar
- Smooth Framer Motion transitions
- Mobile bottom navigation

---

##  Category Browsing

Browse listings across multiple travel categories:

- Beach
- Cabins
- Castles
- Pools
- Skiing
- Tropical
- Lakefront
- Design
- Countryside
- Trending
- Islands

Includes horizontal scrolling with chevron navigation.

---

##  Listing Experience

Each listing includes:

- High-quality image carousel
- Location
- Price
- Rating
- Wishlist interaction

Additional enhancements:

- `next/image` lazy loading
- Skeleton loading states
- Responsive grid layout
- Smooth category switching animations

---

##  Wishlist Interactions

- Animated heart button
- Framer Motion tap effects
- Interactive hover transitions

---

##  AI Travel Concierge

An AI-powered recommendation system built with **Claude Opus 4.7**.

Users can type travel requests such as:

```txt
cozy cabin for ski season
romantic European getaway with vineyards nearby
modern tropical villa with ocean view
```

Claude analyzes the request and returns personalized recommendations with reasoning for each listing.

Each recommendation card includes:

- Listing image
- Location
- Rating
- Price
- AI-generated explanation

---

#  Tech Stack

## Frontend

- Next.js 16
- React 18
- Tailwind CSS
- Framer Motion
- lucide-react

## Backend

- Express.js
- TypeScript
- tsx
- CORS
- dotenv

## AI

- Claude Opus 4.7
- @anthropic-ai/sdk
- Structured JSON outputs
- Adaptive reasoning

## Development Tools

- concurrently
- Turbopack
- App Router

---

#  Claude Integration

The backend AI pipeline is implemented in:

```txt
server/index.ts
```

## How It Works

### 1. Listings Catalog Injection

The backend sends the entire listings catalog to Claude inside the system prompt as structured JSON.

This allows Claude to recommend only valid inventory.

---

### 2. User Query

The user's natural-language travel request is sent as the user message.

Example:

```txt
romantic getaway near vineyards with mountain views
```

---

### 3. Structured JSON Output

Claude returns structured responses using JSON Schema validation:

```json
{
  "summary": "string",
  "recommendations": [
    {
      "listing_id": "string",
      "reason": "string"
    }
  ]
}
```

This guarantees predictable frontend rendering and type-safe recommendation cards.

---

### 4. Adaptive Thinking

Claude uses adaptive reasoning:

```ts
thinking: { type: "adaptive" }
```

This improves semantic matching between user intent and available listings.

---

### 5. Listing Enrichment

The backend maps returned `listing_id` values back to full listing objects before returning the final response to the frontend.

---

#  Project Structure

```txt
travel_website/
├── app/
├── components/
├── lib/
├── server/
├── .gitignore
├── README.md
├── next-env.d.ts
├── next.config.mjs
├── package-lock.json
├── package.json
├── postcss.config.js
├── tailwind.config.ts
└── tsconfig.json
```

---

#  Installation

## Clone Repository

```bash
git clone git@github.com:Alice-Jhang-spaces/travel_website.git
```

## Install Dependencies

```bash
cd travel_website
npm install
```

---

#  Environment Variables

Create a `.env` file in the root directory:

```env
ANTHROPIC_API_KEY=your_api_key_here
```

---

# Run Locally

Start both frontend and backend servers:

```bash
npm run dev
```

Applications will run on:

| Service | URL |
|---|---|
| Frontend | http://localhost:3000 |
| Backend API | http://localhost:3001 |

---

#  UI Highlights

- Airbnb-inspired visual design
- Motion-based interactions
- Responsive layouts
- Interactive listing cards
- Coral-gradient AI concierge panel
- Mobile-first experience

---

# Key Engineering Concepts

- Full-stack TypeScript architecture
- Structured LLM outputs with JSON Schema
- AI-assisted recommendation systems
- Typed API contracts
- Responsive UI engineering
- Framer Motion animations
- Concurrent frontend/backend development workflow

---

# Developed By

**Alice Jhang**

Feel free to reach out for collaborations, opportunities, or feedback.
