/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: '#0A0A0B',
          panel: '#141416',
        },
        border: {
          DEFAULT: '#232327',
        },
        text: {
          primary: '#C8C8C8',
          secondary: '#A0A0A0',
          muted: '#686870',
        },
        accent: {
          DEFAULT: '#0F8A54',
          light: '#1AAA6A',
          dark: '#0A6640',
        },
      },
      fontFamily: {
        heading: ['Archivo', 'sans-serif'],
        body: ['Hanken Grotesk', 'sans-serif'],
      },
      letterSpacing: {
        heading: '0.04em',
      },
    },
  },
  plugins: [],
}
