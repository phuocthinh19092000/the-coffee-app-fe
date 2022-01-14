module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [
    require('./my-preset-color.js'),
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
