/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'small'   : {max: "700px"},
        'medium'  : {min: "700px", max: '1000px'},
        'large'   : {min: "1000px", max: '1200px'},
        'xlarge'  : {min: "1200px"}
      },
      fontFamily: {
        felidae: ["Felidae"],
        nyghtserif: ['Nyght Serif']
      },
      boxShadow: {
        'custom-md': '0 0 10px 1px',
        'custom-xl': '0 0 10px 10px'
      }
    },
  },
  plugins: [],
}