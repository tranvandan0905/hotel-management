/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
const colors = require('tailwindcss/colors');

module.exports = withMT({
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      'purple-custom': '#3f3cbb',
      'gray-custom': '#D9D9D9',
      'blue-custom': '#0771Fc',
      'Purple-dark': '#1E103A',
      'Purple-light': '#291355',
      'Purple-L': "#7d3f98",
      'Purple-C': "#4a237c",
      'orange-C': "#FF5E1F",
      'black' : "#000000",
    },
    extend: {},
  },
  plugins: [],
});
