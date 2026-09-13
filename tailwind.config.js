/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        medieval: ['Cinzel', 'serif'],
        body: ['Crimson Text', 'serif'],
      },
    },
  },
  plugins: [],
}
