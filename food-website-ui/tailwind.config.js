/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      colors: {
        primary: '#FF6347', // Tomato Red
        secondary: '#4CAF50', // Green
        dark: '#333333',
        light: '#F8F8F8',
        grayish: '#CCCCCC',
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
};
