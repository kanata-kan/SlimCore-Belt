import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./config/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ["IBM Plex Sans Arabic", "sans-serif"],
        head: ["Tajawal", "sans-serif"],
      },
      colors: {
        ink: { DEFAULT: "#0B1628", 2: "#2E3D56", 3: "#6B7A94", 4: "#94A3B8" },
        blue: {
          DEFAULT: "#1554E8",
          2: "#0C3DC4",
          3: "#E8EFFE",
          4: "#DBEAFE",
          5: "#1E40AF",
        },
        teal: { DEFAULT: "#00B5A3", 2: "#E0FAF8", 3: "#CCFBF1", 4: "#0D9488" },
        rose: { DEFAULT: "#F04F5F", 2: "#FFF0F1", 3: "#FFE4E6" },
        gold: { DEFAULT: "#F59E0B", 2: "#FEF3C7" },
        s1: "#F8FAFF",
        s2: "#F0FDF9",
        s3: "#F1F5F9",
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
      },
      boxShadow: {
        card: "0 4px 20px rgba(21,84,232,0.06), 0 1px 3px rgba(0,0,0,0.04)",
        "card-hover":
          "0 12px 40px rgba(21,84,232,0.12), 0 2px 6px rgba(0,0,0,0.06)",
        glow: "0 0 40px rgba(21,84,232,0.15)",
        cta: "0 8px 32px rgba(21,84,232,0.35)",
        "cta-hover": "0 16px 48px rgba(21,84,232,0.45)",
      },
      animation: {
        "slide-up": "slideUp 0.5s ease-out",
        "fade-in": "fadeIn 0.4s ease-out",
        "pulse-soft": "pulseSoft 2s ease-in-out infinite",
      },
      keyframes: {
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.7" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
