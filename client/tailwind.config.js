export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#FF6B35',
        secondary: '#4ECDC4',
        accent: '#FFE66D',
        safe: '#00C9A7',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        kids: ['Comic Neue', 'cursive'],
      },
    },
  },
  plugins: [],
}