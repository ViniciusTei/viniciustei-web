const colors = require("tailwindcss/colors")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  theme: {
    extend: {
      colors: {
        ...colors,
        'vinicius': {
          DEFAULT: "#C0C0C0",
          primary: "#84847C",
          green: "#06E767",
          dark: "#141C14",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

