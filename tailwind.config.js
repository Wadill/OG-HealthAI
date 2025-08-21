/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        purple: { 900: '#1A202C', 400: '#9F7AEA', 500: '#6B46C1', 600: '#553C9A' },
        blue: { 900: '#1A202C', 400: '#63B3ED', 500: '#4B5EFC' },
        green: { 400: '#34D399', 500: '#10B981' },
        teal: { 500: '#14B8A6' },
        gray: { 200: '#E5E7EB', 300: '#D1D5DB', 400: '#9CA3AF', 700: '#374151', 800: '#1F2937', 900: '#111827' },
      },
      boxShadow: {
        'lg': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'xl': '0 10px 15px rgba(0, 0, 0, 0.1)',
        '2xl': '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};