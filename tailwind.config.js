/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // We are naming these so they are easy to use
        'apple-bg': '#FBFBFD',     // System background
        'berry': '#4E342E',        // Soft brown-black for text
        'soft-pink': '#FFF5F5',    // Page background
        'apple-blue': '#0071E3',   // Classic iOS Blue
        'rose-petal': '#FF8A80',   // The "Period" highlight color
      },
      borderRadius: {
        'apple': '32px',           // Standard Jony Ive corner radius
        'apple-lg': '40px',        // Extra soft corners
      },
      boxShadow: {
        'apple-soft': '0 20px 40px rgba(0, 0, 0, 0.04)',
        'apple-glow': '0 15px 40px rgba(255, 182, 193, 0.15)',
      }
    },
  },
  plugins: [],
}