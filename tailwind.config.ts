import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        accent: "#0078D4",
        "win-light": {
          taskbar: "rgba(243, 243, 243, 0.85)",
          window: "rgba(255, 255, 255, 0.9)",
          surface: "rgba(255, 255, 255, 0.7)",
          border: "rgba(0, 0, 0, 0.1)",
        },
        "win-dark": {
          taskbar: "rgba(32, 32, 32, 0.85)",
          window: "rgba(32, 32, 32, 0.9)",
          surface: "rgba(45, 45, 45, 0.7)",
          border: "rgba(255, 255, 255, 0.1)",
          bg: "#202020",
        },
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", "Segoe UI", "sans-serif"],
        mono: ["var(--font-geist-mono)", "Consolas", "monospace"],
      },
      backdropBlur: {
        glass: "20px",
      },
      borderRadius: {
        win: "8px",
        "win-lg": "12px",
      },
      animation: {
        "boot-pulse": "boot-pulse 1.5s ease-in-out infinite",
        "fade-in": "fade-in 0.3s ease-out",
        "slide-up": "slide-up 0.3s ease-out",
        "slide-down": "slide-down 0.3s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
      },
      keyframes: {
        "boot-pulse": {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        "slide-up": {
          "0%": { transform: "translateY(10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "slide-down": {
          "0%": { transform: "translateY(-10px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
