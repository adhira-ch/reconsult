const withMT = require("@material-tailwind/react/utils/withMT");
module.exports = withMT({
  content: [
    './src/**/*.{js,jsx,ts,tsx,css}',
],
  theme: {
    extend: {
      colors: {
        one: '#003371',
        two: '#0070AC',
        three: '#91C1D8',
        four: '#D6E2E8',
        five: '#B2BCBB',
      },
  },
  fontFamily: {
    vango: ['vango'],
  },
  plugins: [],
}
});