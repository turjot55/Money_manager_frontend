/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#8b5cf6',
          dark: '#7c3aed'
        },
        secondary: {
          DEFAULT: '#ec4899',
          dark: '#db2777'
        },
        background: {
          DEFAULT: '#111827', // gray-900
          light: '#1f2937', // gray-800
        }
      }
    }
  },
  plugins: [],
}