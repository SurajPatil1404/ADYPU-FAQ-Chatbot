/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F5F0EB',
        accent: {
          yellow: '#F5C518',
          pink: '#F4A7B9',
          mint: '#6FD4A0',
          pinkBubble: '#F4C2CC',
        },
        sidebar: '#1A1A1A',
        dark: '#1A1A1A',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        dmsans: ['DM Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
