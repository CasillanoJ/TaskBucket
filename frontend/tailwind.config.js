/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}", "./node_modules/flowbite/**/*.js"],
  theme: {
    extend: {
      backgroundImage: {
        hero: "url('assets/images/wavybg.png')",
      },
      colors: {
        primary: {
          100: "#C595FF",
          200: "#D4B0FF",
        },
        secondary: "#2D2A44",
        row: "#27253B",
        txt: {
          100: "#D2D0E5",
          200: "#8E97A8",
        },
        unassigned: "FFFFFF",
        "to-do": "#00B8CE",
        "in-progress": "#FA59A0",
        completed: "#6CC000",
        nav: "#12121C ",
        task: "#D4B0FF",
        "main-body": "#21212F",
        "task-content": "#3B3854",
        "second-text-color": "#AEA9D6",
        "table-hover": "#3B3854",
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
  plugins: [require("flowbite/plugin"), require("daisyui")],
};
