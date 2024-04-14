/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('assets/images/wavybg.png')",
      },
      colors: {
        "custom-bg": "#211f35",
        primary: "#C595FF",
        secondary: "#12121C",
      },
      fontFamily: {
        rubik: ["Rubik", "sans-serif"],
        baloo: ['"Baloo 2"', "sans-serif"],
      },
      fontWeight: {
        "custom-normal": 400,
        "custom-bold": 700,
      },
    },
  },
  plugins: [],
};
