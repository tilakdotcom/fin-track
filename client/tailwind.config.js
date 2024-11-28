/** @type {import('tailwindcss').Config} */
export default  {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: '#4C51BF', // Light mode primary color
          dark: '#35ba54',  // Dark mode primary color
        },
        background: {
          light: '#F7FAFC', // Light mode background
          dark: '#1A202C',  // Dark mode background
        },
        text: {
          light: '#1A202C', // Light mode text
          dark: '#F7FAFC',  // Dark mode text
        },
        accent: {
          light: '#63B3ED', // Light mode accent
          dark: '#35ba54',  // Dark mode accent
        },
      },
    },
  },
  plugins: [],
};
