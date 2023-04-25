/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    letterSpacing: {
      normal: '.15em',
    },
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      ...colors,
      transparent: 'transparent',
      current: 'currentColor',
      'blue': '#1fb6ff',
      'purple': '#7e5bef',
      'pink': '#ff49db',
      'orange': '#ff7849',
      'green': '#13ce66',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#717170',
      'gray-50': '#E8E8E6',
      'gray-light': '#B0B0B0',
      'page-bg': '#FFFEFC',
      'txt-light': '#B0B0B0',
      'txt-dark': colors.gray[700],
    },
    fontFamily: {
      sans: ['var(--lato-font)', 'Inter var', ...defaultTheme.fontFamily.sans],
      serif: ['var(--arvo-font)', 'serif'],
    },

    extend: {
      lineHeight: {
        'extra-loose': '2.5',
      },
      
      animation: {
        fade: 'fadeIn 1s ease-in-out',
        fadeSlow: 'fadeIn 2s ease-in-out',
        fadeFast: 'fadeIn .25s ease-in-out',
      },

      // that is actual animation
      keyframes: theme => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { color: 1 },
        },
      }),
    },
    plugins: [],
  }
}