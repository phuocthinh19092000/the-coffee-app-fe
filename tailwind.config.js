module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  // presets: [
  //   require('./my-preset-color.js'),
  // ],
  theme: {
    colors: {
      primary: {
        1: '#FFF2E7',
        2: '#153913',
      },
      accent: {
        1: '#D50F67',
        2: '#ED619F',
        3: '#F499C1',
      },
      black: '#333333',
      white: '#FFFFFF',
      grey: {
        1: '#999999',
        2: '#BDBDBD',
        3: '#DBDBDB',
        4: '#F2F2F2',
      },
      brown: '#502f13',
      success: '#499E3B',
      error: '#E51616',
      warning: '#FE5D18',
    },
    extend: {
      spacing: {
        '0.5': '0.5rem',
        '1': '1rem',
        '1.5': '1.5rem',
        '2': '2rem',
        '3': '3rem',
        '4': '4rem',
        '5': '5rem',
        '6': '6rem',
      },
    },
  },
  plugins: [],
};
