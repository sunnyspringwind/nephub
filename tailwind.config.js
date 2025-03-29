/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"
  ],
  darkMode: "media", // Uses system settings instead of a "dark" class
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#fff8e1",
          100: "#ffecb3",
          200: "#ffe082",
          300: "#ffca28",
          400: "#ffb300",
          500: "#ffa000", // Main primary color
          600: "#ff8f00",
          700: "#ff6f00",
          800: "#e65100",
          900: "#bf360c",
        },
        secondary: {
          olive: {
            50: "#f5f7e5",
            100: "#e6ebc2",
            200: "#d6dfa0",
            300: "#c3cf80",
            400: "#a8b864",
            500: "#8a9a48",
            600: "#6e7d38",
            700: "#525d29", // Deep Olive
            800: "#37401a",
            900: "#1c200d",
          },
          burgundy: {
            50: "#fae6e8",
            100: "#f3c2c7",
            200: "#ea9ca2",
            300: "#df757c",
            400: "#d44c55",
            500: "#aa2e3a",
            600: "#89262e",
            700: "#671c22",
            800: "#441316", // Dark Burgundy
            900: "#22090b",
          },
        }
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
  },
}