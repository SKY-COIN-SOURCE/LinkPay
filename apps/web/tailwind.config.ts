import type { Config } from "tailwindcss";
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: { extend: { colors: { brand: "#0A66FF" } } },
  plugins: [],
} satisfies Config;