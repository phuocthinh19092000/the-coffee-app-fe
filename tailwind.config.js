module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      proximaNova: ['"proxima-nova"', 'sans-serif'],
    },
    fontSize: {
        1: '12px',
        2: '16px',
        2.5: '18px',
        3: '22px',
        4: '26px',
    },
    colors: {
      primary: {
        1: '#FFF2E7',
        2: '#153913',
      },
      accent: {
        1: '#D50F67',
        2: '#ED619F',
        3: '#F499C1',
        4: '#FFF3F9'
      },
      black: '#333333',
      white: '#FFFFFF',
      grey: {
        1: '#999999',
        2: '#BDBDBD',
        3: '#DBDBDB',
        4: '#F2F2F2',
        5: '#666666',
      },
      'vendor-grey-4': '#E6E6E6',
      brown: '#502f13',
      success: '#499E3B',
      error: '#E51616',
      warning: '#FE5D18',
      outline: '#cac3c3',
      green: '#499e3b',
    },
    screens: {
      'sm': '375px', //mobile screen
      'md': '768px', //tablet screen
      'lg': '1152px', //laptop screen
      'xl': '1440px', //desktop screen
    },
    extend: {
      spacing: {
        0.5: '0.5rem',
        1: '1rem',
        1.25: '1.25rem',
        1.5: '1.5rem',
        1.875: '1.875rem',
        2: '2rem',
        2.5: '2.5rem',
        3: '3rem',
        3.5: '3.5rem',
        4: '4rem',
        5: '5rem',
        6: '6rem',
        15: '15%',
        50: '50%'
      },
    },
  },
  plugins: [],
};
