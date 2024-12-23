import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#FFFFFF",
        foreground: "#1A1A1A",
        primary: {
          DEFAULT: "#FF7A00",
          hover: "#E66E00",
          foreground: "#FFFFFF",
        },
        secondary: {
          DEFAULT: "#1A1A1A",
          hover: "#333333",
          foreground: "#FFFFFF",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "#F9F9F9",
          foreground: "#333333",
        },
        accent: {
          DEFAULT: "#F9F9F9",
          foreground: "#1A1A1A",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      spacing: {
        section: "60px",
      },
      fontFamily: {
        sans: ["Montserrat", "sans-serif"],
      },
      fontSize: {
        h1: ["48px", { lineHeight: "1.2", fontWeight: "700" }],
        h2: ["32px", { lineHeight: "1.3", fontWeight: "600" }],
        h3: ["28px", { lineHeight: "1.4", fontWeight: "600" }],
        body: ["18px", { lineHeight: "1.6", fontWeight: "400" }],
        // Add mobile-specific font sizes
        "mobile-h1": ["24px", { lineHeight: "1.2", fontWeight: "700" }],
        "mobile-h2": ["20px", { lineHeight: "1.3", fontWeight: "600" }],
        "mobile-h3": ["18px", { lineHeight: "1.4", fontWeight: "600" }],
        "mobile-body": ["16px", { lineHeight: "1.6", fontWeight: "400" }],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;