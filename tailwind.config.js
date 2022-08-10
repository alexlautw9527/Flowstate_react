/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
    },
    extend: {
      fontFamily: {
        'pixel': ['Press Start K'],
      },
      colors: {
        primary: '#4A525A',
        secondary: '#FCF8E8',
        gameboy: '#9ec65a'
      }
    },
  },
  plugins: [],
}
