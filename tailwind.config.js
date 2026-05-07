const colors = require("tailwindcss/colors")
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.html"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ...colors,
        // Semantic tokens — CSS vars swap values for dark/light in styles.css
        'background':        'var(--color-background)',
        'surface':           'var(--color-surface)',
        'surface-low':       'var(--color-surface-low)',
        'surface-high':      'var(--color-surface-high)',
        'on-surface':        'var(--color-on-surface)',
        'on-surface-variant':'var(--color-on-surface-variant)',
        'accent':            '#00ff7f',
        'accent-text':       'var(--color-accent-text)',
        'outline':           'var(--color-outline)',
        'outline-variant':   'var(--color-outline-variant)',
      },
      fontFamily: {
        display: ['Epilogue', 'sans-serif'],
        body:    ['Manrope', 'sans-serif'],
        label:   ['"Space Grotesk"', 'sans-serif'],
      },
      keyframes: {
        enter: {
          '0%':   { transform: 'translateY(300px)' },
          '100%': { transform: 'translateY(0)' },
        },
        leave: {
          '0%':   { transform: 'translateY(0)' },
          '100%': { transform: 'translateY(300px)' },
        },
      },
      animation: {
        enter: 'enter 1s ease-in',
        leave: 'leave 1s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
