/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#0D1B2E',
          800: '#132C4A',
          700: '#1a3a60',
        },
        brand: {
          orange: '#FF7C52',
          blue: '#2B6CF6',
          'blue-dark': '#1f5bdc',
          'blue-light': '#EEF3FF',
        },
      },
      fontFamily: {
        sans: ['Rubik', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        card: '0 4px 24px rgba(0,0,0,0.08)',
        'card-lg': '0 8px 40px rgba(0,0,0,0.12)',
      },
    },
  },
  plugins: [],
}
