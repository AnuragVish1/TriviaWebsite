/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily:{
      'lora': ['Lora']
    },
    extend: {},
  },
  plugins: [require('tailwindcss-motion')],
}