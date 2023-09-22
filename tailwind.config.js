/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/components/*.{html,js}"],
  theme: {
    extend: {
      height: {
        "1/7": "10%",
      },
    },
  },
  plugins: [],
};
