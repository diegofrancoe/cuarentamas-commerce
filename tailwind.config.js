/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        claro: "#f6f0dd",   // blanco hueso
        verde: "#124948",   // verde
        naranja: "#eb632f", // naranja
      },
      animation: {
        spinSlow: 'spin 8s linear infinite',
      }
    },
  },
  plugins: [],
}
