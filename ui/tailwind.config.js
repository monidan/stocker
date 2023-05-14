const colors = require('tailwindcss/colors');

export default {
    content: ['./src/**/*.{html,js,vue}'],
    theme: {
      colors: {
        ...colors,
        'brand': {
          '100': '#E6F5D7',
          '200': '#DAF5BF',
          '400': '#CFF6A7',
          '700': '#AEDB7F',
        },
        'secondary': {
          '100': '#BD634B',
          '200': '#BD5439',
          '400': '#A33B20',
          '700': '#8A270E',
        },
        'orange': {
          '100': '#FF9B33',
          '200': '#FF8E1A',
          '400': '#FF8200',
          '700': '#CC6800',
        },
        'blue': {
          '100': '#645A70',
          '200': '#4D4657',
          '400': '#37323E',
          '700': '#201D24',
        },
        'white': '#FFFFFF',
        'black': '#000000',
        'gray': '#E6E6E6',
        'cold-gray': '#BCC1CA',
      },
      fontFamily: {
        sans: ['Montserrat', 'sans-serif'],
      },
      extend: {
        spacing: {
          '8xl': '96rem',
        },
        borderRadius: {
          '4xl': '2rem',
        },
        boxShadow: {
          'standard-dark': '0px 24px 36px rgba(0, 0, 0, 0.35)',
          'light-still': '0 0 1px 4px rgba(255, 255, 255, 0.20)'
        },
        backgroundImage: {
          'dark-gradient': 'linear-gradient(to right top, #645A70 0%, #000000 100%)',
        }
      },
      screens: {
        'md': '744px',
        'lg': '1440px',
      }
    },
  }