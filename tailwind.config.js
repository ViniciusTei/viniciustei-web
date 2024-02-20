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
      keyframes: {
        enter: {
          '0%': { transform: 'translateY(300px)' },
          '100%': { transform: 'translateY(0)' },
        },
        leave: {
          '0%': { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(300px)' },
        }
      },
      animation: {
        enter: 'enter 1s ease-in',
        leave: 'leave 1s ease-out',
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}

