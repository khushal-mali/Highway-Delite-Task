/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#367AFF",
      },
      screens: {
        xs: "450px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
