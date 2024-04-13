/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}",
  "./node_modules/flowbite/**/*.js"
],
  theme: {
    colors:{
      "nav" :"#12121C ",
      "task": "#D4B0FF",
      "main-body" : "#21212F",
      "task-bg": "#2D2A44",
      "task-content" :"#3B3854",
      "second-text-color": "#AEA9D6"
      

    },
    extend: {
      colors: {
        "custom-bg": "#211f35",
        primary: "#C595FF",
        secondary: {
          100: "#E2E2D5",
          200: "#888883",
        },
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
  plugins: [
    require('flowbite/plugin'),
    
  ],
};
