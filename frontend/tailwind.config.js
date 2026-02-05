/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Memphis Design Palette
        peach: {
          50: '#fdf8f5',
          100: '#fce8de',
          200: '#fad4c3',
          300: '#f7b5a0',
          400: '#f5957d',
          500: '#f2765a', // Main peach
          600: '#e85a3d',
          700: '#d94a2e',
          800: '#c93d24',
          900: '#b8321d',
        },
        mint: {
          50: '#f0fdf9',
          100: '#ccf9f0',
          200: '#99f3e1',
          300: '#66ecd2',
          400: '#33e5c3',
          500: '#00ddb4', // Vibrant mint
          600: '#00c9a0',
          700: '#00b58c',
          800: '#009178',
          900: '#007d64',
        },
        lilac: {
          50: '#faf7fd',
          100: '#f0e5fb',
          200: '#e1ccf7',
          300: '#d2b3f3',
          400: '#c39aef',
          500: '#b481eb', // Vibrant lilac
          600: '#a368e7',
          700: '#9250e3',
          800: '#8137df',
          900: '#701fdb',
        },
        sunny: {
          50: '#fffbf0',
          100: '#fff5d6',
          200: '#ffecad',
          300: '#ffe284',
          400: '#ffd85b',
          500: '#ffce32', // Vibrant yellow
          600: '#f5c028',
          700: '#ebb21e',
          800: '#e1a414',
          900: '#d7960a',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-lg': ['3rem', { lineHeight: '1.1', fontWeight: '700' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', fontWeight: '700' }],
        'display-sm': ['1.875rem', { lineHeight: '1.3', fontWeight: '700' }],
      },
      boxShadow: {
        'memphis': '0 8px 16px rgba(0, 0, 0, 0.1), -4px -4px 0 rgba(0, 0, 0, 0.05)',
        'memphis-lg': '0 16px 32px rgba(0, 0, 0, 0.15), -8px -8px 0 rgba(0, 0, 0, 0.08)',
        'memphis-sm': '0 4px 8px rgba(0, 0, 0, 0.08)',
      },
      borderRadius: {
        'memphis': '20px',
        'memphis-lg': '32px',
        'memphis-sm': '12px',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
        'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'pulse-soft': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
      },
      backgroundImage: {
        'memphis-pattern': `
          radial-gradient(circle at 20% 50%, rgba(255, 206, 50, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 80% 80%, rgba(180, 129, 235, 0.1) 0%, transparent 50%),
          radial-gradient(circle at 40% 80%, rgba(0, 221, 180, 0.1) 0%, transparent 50%)
        `,
      },
    },
  },
  plugins: [],
}
