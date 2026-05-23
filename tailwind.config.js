/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#05070D',
        panel: 'rgba(255,255,255,0.06)',
        cyan: '#00E5FF',
        violet: '#8A5CFF',
        muted: '#9CA3AF',
        line: 'rgba(255,255,255,0.12)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'Segoe UI', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        neon: '0 0 28px rgba(0,229,255,0.18), 0 0 48px rgba(138,92,255,0.14)',
        card: '0 18px 60px rgba(0,0,0,0.32)',
      },
      backgroundImage: {
        'radial-grid':
          'radial-gradient(circle at 15% 12%, rgba(0,229,255,0.14), transparent 26%), radial-gradient(circle at 82% 18%, rgba(138,92,255,0.16), transparent 28%), linear-gradient(180deg, #05070D 0%, #080B13 50%, #05070D 100%)',
      },
    },
  },
  plugins: [],
};
