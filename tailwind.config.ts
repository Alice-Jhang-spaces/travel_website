import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        rausch: "#FF385C",
        babu: "#00A699",
        arches: "#FC642D",
        hof: "#484848",
        foggy: "#717171",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        airbnb: "0 6px 16px rgba(0,0,0,0.12)",
        "airbnb-sm": "0 1px 2px rgba(0,0,0,0.08)",
      },
    },
  },
  plugins: [],
};

export default config;
