/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero": "url('assets/images/wavybg.png')",
      },
      width: {
        btn: "30rem"
      },
      colors: {
        "custom-bg": "#21212F",
        primary: "#C595FF",
        secondary: "#2D2A44",
        nav: "#12121C",
        row: "#27253B",
        txt: {
          100: "#D2D0E5",
          200: "#8E97A8"
        }
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
