/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        drift: {
          bg: '#080B11',
          surface: '#0D111A',
          card: '#131722',
          panel: '#171B27',
          border: 'rgba(255, 255, 255, 0.07)',
          'border-amber': 'rgba(240, 200, 120, 0.25)',
          'border-teal': 'rgba(31, 169, 131, 0.25)',
          amber: '#F0C878',
          'amber-bright': '#E8B24D',
          'amber-deep': '#C99A44',
          teal: '#1FA983',
          'teal-bright': '#35D6A9',
          muted: '#5C6478',
          subtle: '#8E96AB',
          foreground: '#F2F0EA',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'Geist', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
    },
  },
  plugins: [],
}