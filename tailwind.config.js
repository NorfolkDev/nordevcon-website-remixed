/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "wave-purple": "#53345D",
        "wave-pink": "#AC4B74",
        "wave-orange": "#FA7268",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
