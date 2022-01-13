module.exports = {
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
    spacing: {
      '1': '8px',
      '2': '12px',
      '3': '16px',
      '4': '24px',
      '5': '32px',
      '6': '40px',
      '7': '48px',
      '8': '56px'
    },
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/aspect-ratio'),
  ],
};
