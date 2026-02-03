/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}", // make sure all your React files are included
  ],
  theme: {
    extend: {
      colors: {
        'pos-bg': '#F3F4F6',
        'pos-primary': '#1D4ED8', // example: your POS primary
        'pos-accent': '#F59E0B',  // example: your accent
      },
    },
  },
  plugins: [],
}
