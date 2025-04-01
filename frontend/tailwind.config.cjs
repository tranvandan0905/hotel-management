/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'purple': '#3f3cbb',
      'midnight': '#121063',
      'metal': '#565584',
      'tahiti': '#3ab7bf',
      'silver': '#ecebff',
      'bubble-gum': '#ff77e9',
      'bermuda': '#78dcca',
      'Purple-dark': '#1E103A',
      'Purple-light': '#291355',
      'black' : '#000000',
      'red':'#FF0000',
      'gray':'#D9D9D9D9',
      'blue':'#0771Fc',
      'Purple-L':"#7d3f98",
      'Purple-C':"#4a237c",
      'orange-C':	"#FF5E1F",
    },

    extend: {},
  },
  plugins: [],
});
