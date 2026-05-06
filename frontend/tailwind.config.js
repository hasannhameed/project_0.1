/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        sakura: "#FFB1D1", // Example Sakura color
        "sakura-soft": "#FFD1E1",
        sky: "#00EAFF",
        sunset: "#FF8A00",
        twilight: "#6F00FF",
        lantern: "#FF4D4D",
      },
      fontFamily: {
        // Define your custom font family here
        // display: ['YourCustomFont', 'sans-serif'],
      },
      backgroundImage: {
        // Creates Retro Cyberpunk Scanlines
        scanlines:
          "linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,0.5) 50%)",
        // Creates Vignette (Dark edges)
        vignette:
          "radial-gradient(circle at center, transparent 0%, rgba(0,0,0,0.8) 100%)",
      },
      // Keep your existing keyframes and animation definitions below...
      keyframes: {
        blob: {
          /* your blob keyframes */
        },
        rise: {
          /* your rise keyframes */
        },
        sparkle: {
          /* your sparkle keyframes */
        },
        marquee: {
          /* your marquee keyframes */
        },
        "pulse-ring": {
          /* your pulse-ring keyframes */
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
      },
      animation: {
        blob: "blob 15s infinite",
        rise: "rise 0.6s ease-out forwards",
        sparkle: "sparkle 2s infinite",
        marquee: "marquee 25s linear infinite",
        "pulse-ring": "pulse-ring 1.5s infinite",
        "spin-slow": "spin 10s linear infinite",
        float: "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
