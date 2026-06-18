/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Legacy — kept so existing components don't break
        'bg-primary': '#050816',
        'bg-secondary': '#0d1117',
        'cyan-accent': '#00d4ff',
        'purple-accent': '#a855f7',
        'pink-accent': '#ec4899',
        // New neon trio
        'neon-cyan': '#00f5ff',
        'neon-magenta': '#ff0080',
        'neon-lime': '#00ff88',
      },
      fontFamily: {
        'space': ['Space Grotesk', 'sans-serif'],
        'inter': ['Inter', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
