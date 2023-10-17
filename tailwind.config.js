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
      fontFamily: {
        "comic-sans": "'Comic Sans MS', 'Comic Sans', cursive",
      },
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
