const { themeFontSizes } = require('./theme/themeFontSizes');
const { themeBaseTypography } = require('./theme/themeBaseTypography');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './ui/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      '2xs': '320px',
      xs: '498px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    colors: {
      white: '#FFFFFF',
      black: '#000000',
      transparent: 'transparent',
      ds: {
        grey: {
          900: '#171717',
          800: '#595959',
          700: '#696D74',
          200: '#F5F5F7',
        },
        orchid: '#C964D6',
        green: '#A9FF88',
      },
      brand: {
        instagram: '#F56040',
        behance: '#1769FF',
        dribbble: '#EA4C89',
        telegram: '#0088cc',
      },
    },
    extend: {
      typography: (theme) => ({
        DEFAULT: {
          css: themeBaseTypography(theme),
        },
        lg: {
          css: {
            ...themeBaseTypography(theme),
            ...theme('fontSize.primary-lg')[1],
            fontSize: theme('fontSize.primary-lg')[0],
          },
        },
      }),
      fontSize: themeFontSizes(),
      gridTemplateColumns: {
        hero: '1fr 6fr 1fr',
        'hero-lg': '1fr 2fr 1fr',
      },
      spacing: {
        'screen-y-1/25': '4vh',
      },
      inset: {
        '1/25': '4%',
        'screen-y-1/10': '10vh',
        'safari-ios-bottom-tab-bar':
          'calc(1.5rem + env(safe-area-inset-bottom))',
      },
      scale: {
        115: '1.15',
      },
      maxWidth: {
        280: '70rem',
      },
      maxHeight: {
        314.5: '78.625rem',
      },
      minWidth: {
        60: '15rem',
      },
      minHeight: {
        'screen-2/3': '66vh',
        'screen-4/5': '80vh',
      },
      width: {
        4.5: '1.125rem',
        10.5: '2.625rem',
        38: '9.25rem',
        'page-top-icon': 'clamp(1.5rem, 0.86rem + 3.21vw, 3.75rem)',
      },
      height: {
        '1px': '1px',
        4.5: '1.125rem',
        10.5: '2.625rem',
        38: '9.25rem',
        navigation: '3.625rem',
        'page-top': '83em',
        'page-top-icon': 'clamp(1.5rem, 0.86rem + 3.21vw, 3.75rem)',
        'screen-1/2': '50vh',
        'screen-1.4x': '140vh',
        'screen-2x': '200vh',
      },
      margin: {
        2.5: '0.625rem',
        15: '3.75rem',
        18: '4.5rem',
        25: '6.25rem',
        30: '7.5rem',
        35: '8.75rem',
        'recent-cases-1': 'clamp(31.25rem, 29.46rem + 8.93vw, 37.5rem)',
        'recent-cases-2': 'clamp(12.5rem, 11.6rem + 4.46vw, 15.625rem)',
        'recent-cases-3': 'clamp(6.25rem, 5.357rem + 4.46vw, 9.375rem)',
      },
      padding: {
        2.5: '0.625rem',
        15: '3.75rem',
        25: '6.25rem',
        30: '7.5rem',
        35: '8.75rem',
        'container-1': 'calc(clamp(2.5em, 7vw, 7em) * 2)',
        'container-2': 'clamp(2.5em, 7vw, 7em)',
        'container-3': 'clamp(1em, 5vw, 6em)',
        'container-4': 'clamp(1em, 4vw, 2.5em)',
      },
      gap: {
        main: 'clamp(1.5rem, -1.93rem + 7.14vw, 4.5rem)',
        'main-sm': '2.22222vw',
        'main-lg': '5vw',
      },
      borderRadius: {
        '1/2': '50%',
        main: 'clamp(1.7rem, 2.2vw + 1rem, 3rem)',
        'main-sm': 'clamp(0.8rem, 2vw + 0.2rem, 2rem)',
        button: '10.625rem',
      },
      boxShadow: {
        'fake-border': '0 0 0 0.5px',
      },
      transitionProperty: {
        fill: 'fill',
      },
      keyframes: {
        'wave-call-me': {
          '0%': { transform: 'rotate(0)' },
          '10%': { transform: 'rotate(14deg)' },
          '30%': { transform: 'rotate(-8deg)' },
          '50%': { transform: 'rotate(14deg)' },
          '70%': { transform: 'rotate(-4deg)' },
          '90%': { transform: 'rotate(10deg)' },
          '100%': { transform: 'rotate(0)' },
        },
        wave: {
          '0%': { transform: 'rotate(0)' },
          '10%': { transform: 'rotate(-10deg)' },
          '15%': { transform: 'rotate(12deg)' },
          '20%': { transform: 'rotate(-10deg)' },
          '25%': { transform: 'rotate(9deg)' },
          '30%': { transform: 'rotate(0)' },
          '100%': { transform: 'rotate(0)' },
        },
        roll: {
          '0%': { transform: 'rotate(0)' },
          '25%': { transform: 'rotate(-15deg)' },
          '50%': { transform: 'rotate(0)' },
          '75%': { transform: 'rotate(15deg)' },
          '100%': { transform: 'rotate(0)' },
        },
        'pulse-heart': {
          '0%': { transform: 'scale(1)' },
          '25%': { transform: 'scale(1.12)' },
          '50%': { transform: 'scale(1)' },
          '75%': { transform: 'scale(1.12)' },
          '100%': { transform: 'scale(1)' },
        },
        'underline-move': {
          '0%': { transform: 'scaleX(1)' },
          '100%': { transform: 'scaleX(0)' },
        },
      },
      animation: {
        'spin-slow': 'spin 60s linear infinite',
        'moving-underline': 'underline-move 0.3s ease-out',
        'wave-call-me': 'wave-call-me 2s linear',
        'waving-hand-loop': 'wave 2.5s linear infinite',
        'rolling-hand-loop': 'roll 1.5s linear infinite',
        'pulsing-hands-loop': 'pulse-heart 1.8s linear infinite',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-3d')],
};
