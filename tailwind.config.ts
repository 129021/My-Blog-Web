import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";
import animate from "tailwindcss-animate";

const config: Config = {
  content: ["./src/**/*.{ts,tsx,mdx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--color-bg)",
        foreground: "var(--color-fg)",
        primary: {
          DEFAULT: "#0ea5e9",
          dark: "#0284c7",
        },
        accent: {
          cyan: {
            from: "#22d3ee",
            to: "#3b82f6",
          },
          purple: {
            from: "#a855f7",
            to: "#ec4899",
          },
        },
      },
      fontFamily: {
        sans: [
          "Inter",
          "PingFang SC",
          "Microsoft YaHei",
          "system-ui",
          "sans-serif",
        ],
        mono: ["JetBrains Mono", "Fira Code", "monospace"],
      },
      fontSize: {
        hero: "clamp(2.5rem, 5vw, 4rem)",
        h1: "clamp(1.8rem, 3vw, 2.5rem)",
        h2: "clamp(1.4rem, 2vw, 1.8rem)",
        body: "1rem",
        "body-lg": "1.125rem",
        caption: "0.875rem",
      },
      borderRadius: {
        card: "12px",
        button: "8px",
        input: "8px",
      },
      animation: {
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "float-up": "float-up 0.3s ease-out",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        "glow-pulse": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "float-up": {
          from: { transform: "translateY(10px)", opacity: "0" },
          to: { transform: "translateY(0)", opacity: "1" },
        },
        shimmer: {
          from: { transform: "translateX(-100%)" },
          to: { transform: "translateX(100%)" },
        },
      },
    },
  },
  plugins: [typography, animate],
};

export default config;
