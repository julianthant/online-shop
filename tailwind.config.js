/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        md: '850px',
        lg: '984px',
        xl: '1240px',
      },
    },
    extend: {
      colors: {
        'matte-black': '#141414',
        'dark-gray': '#505050',
        'light-gray': '#787878',
      },
      screens: {
        xs: '450px',
        s: '600px',
        sm: '650px',
        lm: '700px',
      },
    },
  },
  plugins: [],
};
