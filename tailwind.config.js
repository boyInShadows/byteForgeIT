/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      // inside theme.extend
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        marqueeReverse: {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
      },
      animation: {
        marquee: "marquee 18s linear infinite",
        marqueeReverse: "marqueeReverse 22s linear infinite",
      },

      colors: {
        bf: {
          bg: "#020617",        // deep slate background
          primary: "#22c55e",   // vibrant green accent
          secondary: "#38bdf8", // cyan accent for labels
          secondaryPlus: "#021E2A",
          border: "#1f2937",    // dark border / card outlines
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Space Grotesk", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "SFMono-Regular", "monospace"],
      },
    },
  },
  plugins: [],
};
