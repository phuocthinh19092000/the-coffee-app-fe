const plugin = require('tailwindcss/plugin');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    fontFamily: {
      proximaNova: ['"proxima-nova"', 'sans-serif'],
    },
    fontSize: {
      1: '12px',
      1.5: '14px',
      2: '16px',
      2.5: '18px',
      3: '22px',
      3.5: '24px',
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
        4: '#FFF3F9',
      },
      black: '#333333',
      white: '#FFFFFF',
      grey: {
        1: '#999999',
        2: '#BDBDBD',
        3: '#DBDBDB',
        4: '#F2F2F2',
        5: '#666666',
        6: '#E6E6E6',
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
      sm: '375px', //mobile screen
      md: '768px', //tablet screen
      lg: '1024px', //laptop screen
      xl: '1366px', //desktop screen
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
        50: '50%',
      },
      boxShadow: {
        input: '0px 4px 12px rgba(146, 146, 146, 0.12)',
        button: '0px 4px 12px rgba(189, 15, 114, 0.3)',
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, matchUtilities, theme }) {
      addUtilities({
        '.text-style-vendor-h1': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '600',
          fontSize: '26px',
          lineHeight: '26px',
          letterSpacing: '0.15px',
        },
        '.text-style-vendor-h2': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '600',
          fontSize: '22x',
          lineHeight: '25px',
          letterSpacing: '0.15px',
        },
        '.text-style-vendor-sub-1': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '400',
          fontSize: '18px',
          lineHeight: '21px',
          letterSpacing: '0.15px',
        },
        '.text-style-vendor-sub-2': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '0.1px',
        },
        '.text-style-vendor-body-1': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '400',
          fontSize: '18px',
          lineHeight: '21px',
          letterSpacing: '0.5px',
        },
        '.text-style-vendor-body-2': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '400',
          fontSize: '16px',
          lineHeight: '19px',
          letterSpacing: '0.25px',
        },
        '.text-style-vendor-caption': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '400',
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0.4px',
        },
        '.text-style-1440-h1': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '600',
          fontSize: '24px',
          lineHeight: '30px',
          letterSpacing: '0.07px',
        },
        '.text-style-1440-h2': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '600',
          fontSize: '18px',
          lineHeight: '23px',
          letterSpacing: '0.25px',
        },
        '.text-style-1440-body': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '-0.31px',
        },
        '.text-style-1440-button': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '600',
          fontSize: '16px',
          lineHeight: '21px',
          letterSpacing: '0.35px',
          textTransform: 'uppercase',
        },
        '.text-style-1440-caption': {
          fontFamily: theme('fontFamily.proximaNova'),
          fontWeight: '600',
          fontSize: '14px',
          lineHeight: '19px',
          letterSpacing: '-0.08px',
        },
        '.border-style': {
          borderWidth: '1px',
          borderStyle: 'border-box solid',
          borderRadius: '4px',
        },
        '.text-style-upload': {
          fontFamily: theme('fontFamily.proximaNova'),
          height: '19px',
          fontSize: '14px',
          lineHeight: '19px',
          color: theme('colors.black'),
        },
        '.order-column-center': {
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        },
        '.background-blur': {
          background: 'rgba(51, 51, 51, 0.3)',
          backdropFilter: 'blur(5px)',
          zIndex: '1',
          top: '0',
          left: '0',
          width: '100%',
          height: '100%',
          position: 'fixed',
        },
      });
      matchUtilities(
        {
          'status-color': (value) => {
            const color = value.toString().split('-').join('.');
            return {
              color: theme(`colors.${color}`),
              textTransform: 'capitalize',
            };
          },
        },
        { values: theme('colors') },
      );
    }),
  ],
};
