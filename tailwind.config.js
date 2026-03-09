/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Montserrat', 'sans-serif'],
      },
      colors: {
        // Paleta elegante oscura
        ink: {
          50: 'rgba(255,255,255,0.05)',
          100: 'rgba(255,255,255,0.10)',
          200: 'rgba(255,255,255,0.20)',
          300: 'rgba(255,255,255,0.30)',
          400: 'rgba(255,255,255,0.40)',
          500: 'rgba(255,255,255,0.50)',
          600: 'rgba(255,255,255,0.60)',
          700: 'rgba(255,255,255,0.70)',
          800: 'rgba(255,255,255,0.80)',
          900: 'rgba(255,255,255,0.90)',
        },
      },
      animation: {
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease forwards',
        'ken-burns': 'kenBurns 12s ease-out infinite alternate',
      },
      keyframes: {
        slideUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        kenBurns: {
          '0%': { transform: 'scale(1)' },
          '100%': { transform: 'scale(1.08)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
};
