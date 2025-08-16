import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f3f6ff',
          100: '#e7eeff',
          200: '#c2d0ff',
          300: '#9cb2ff',
          400: '#7694ff',
          500: '#5076ff',
          600: '#345be6',
          700: '#2846b4',
          800: '#1d3181',
          900: '#111e4f'
        }
      }
    },
  },
  plugins: [],
}

export default config