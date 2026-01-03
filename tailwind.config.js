/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0a192f', // Deep Navy
          light: '#172a46',
        },
        accent: {
          DEFAULT: '#ffd700', // Gold
          gold: '#ffd700',
          white: '#ffffff',
        },
        text: {
          main: '#e6f1ff',
          muted: '#8892b0',
        }
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
