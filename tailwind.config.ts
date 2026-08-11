import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "Arial", "sans-serif"],
        display: ["var(--font-inter-tight)", "Arial", "sans-serif"]
      },
      colors: {
        ink: "#111111",
        muted: "#6B6B6B",
        line: "#E8E8E8",
        surface: "#F7F7F7",
        sale: "#C62828"
      }
    }
  },
  plugins: []
};
export default config;
