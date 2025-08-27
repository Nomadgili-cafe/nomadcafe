/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sand: {
          50: '#fdf8f3',
          100: '#faf0e4',
          200: '#f4dfc4',
          300: '#ecc89f',
          400: '#e2a972',
          500: '#d4915a',
          600: '#c67c4e',
          700: '#a56342',
          800: '#85503b',
          900: '#6d4231',
        },
        driftwood: {
          50: '#f7f5f3',
          100: '#ede8e3',
          200: '#ddd4c7',
          300: '#c7b8a4',
          400: '#b09981',
          500: '#9d8268',
          600: '#8a6f5c',
          700: '#725b4d',
          800: '#5e4c42',
          900: '#4d3f37',
        },
        ocean: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        }
      },
      fontFamily: {
        'clarendon': ['Playfair Display', 'serif'],
      }
    },
  },
  plugins: [],
};
