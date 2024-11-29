/** @type {import('tailwindcss').Config} */
export default  {
  darkMode: 'class', // Enable dark mode using the 'class' strategy
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        greenish: {
          50: "#f0fdf4",
          100: "#dcfce7",
          200: "#bbf7d0",
          300: "#86efac",
          400: "#4ade80",
          500: "#22c55e",
          600: "#16a34a",
          700: "#15803d",
          800: "#166534",
          900: "#14532d",
        },
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
