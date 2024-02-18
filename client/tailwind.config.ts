import type { Config } from "tailwindcss";

const config = {
  content: [
    "./components/ui/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    extend:{
    colors: {
      surface: "#c2506e",
      muted: "#fcbfda",
      overlay: "#fdf0f5",
      light: "#ffffff",
      dark: "#000000",
      gray: "#f7f6f9",
    },
    },
  },
} satisfies Config;

export default config;
