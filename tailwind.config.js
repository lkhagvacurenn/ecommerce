/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        spanClr:'var(--spanClr)',
        boxBgClr:'var(--boxBgClr)',
        starClr: 'var(--starClr)',
        primaryClr:'var(--primaryClr)',
        secondaryClr: 'var(--secondaryClr)',
      }
    },
  },
  plugins: [],
}

