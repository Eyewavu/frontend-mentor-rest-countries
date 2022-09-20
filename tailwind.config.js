/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  mode:"jit",
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        "Nunito": ["Nunito Sans","sans-serif"]
      },
      colors: {
        "dark-blue": "hsl(209, 23%, 22%)",
        "very-dark-blue": {
          "background": "hsl(207, 26%, 17%)",
          "text": "hsl(200, 15%, 8%)",
        },
        "dark-gray": "hsl(0, 0%, 52%)",
        "very-light-gray": "hsl(0, 0%, 98%)",
        "white": "hsl(0, 0%, 100%)"
      }
    },
  },
  plugins: [],
}
