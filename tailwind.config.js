/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        ink: {
          950: '#0D0D0C',
          900: '#1A1A18',
          800: '#2C2C2A',
          600: '#5F5E5A',
          400: '#888780',
          200: '#B4B2A9',
          100: '#D3D1C7',
          50:  '#F1EFE8',
        },
        accent: {
          DEFAULT: '#534AB7',
          hover:   '#3C3489',
          light:   '#EEEDFE',
          border:  '#CECBF6',
        },
        teal: {
          DEFAULT: '#1D9E75',
          light:   '#E1F5EE',
          dark:    '#0F6E56',
        },
        amber: {
          DEFAULT: '#BA7517',
          light:   '#FAEEDA',
          dark:    '#854F0B',
        },
        danger: {
          DEFAULT: '#D85A30',
          light:   '#FAECE7',
          dark:    '#993C1D',
        },
      },
      animation: {
        'fade-up': 'fadeUp 0.4s ease forwards',
        'blink': 'blink 1.2s infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        blink: {
          '0%,80%,100%': { opacity: '0.25' },
          '40%':          { opacity: '1' },
        },
      },
    },
  },
  plugins: [],
}
