/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      gradientX: {
        '0%, 100%': { backgroundPosition: 'left' },
        '50%': { backgroundPosition: 'right' },
      },
    },
    animation: {
      gradientX: 'gradientX 2s ease infinite',
    },
      
  },
  plugins: [],
}
