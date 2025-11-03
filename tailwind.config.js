/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        spanClr:"#4B5563",
        boxBgClr:"#F8FAFC",
        starClr: "#FBBF24",
        primaryClr:"#0EA5E9",
        secondaryClr: "#111827",
      }
    },
  },
  plugins: [],
}

