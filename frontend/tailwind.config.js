/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/**/*.{html,js}",
  "./node_modules/flowbite/**/*.js"
],
  theme: {
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
    },
    
    colors:{
      "nav" :"#12121C ",
      "task": "#D4B0FF",
      "main-body" : "#21212F",
      "task-bg": "#2D2A44",
      "task-content" :"#3B3854",
      "second-text-color": "#AEA9D6",
      "progress-count": "#09DDC9"
      

    },
    extend: {
      colors: {
        primary: "#C595FF",
        secondary: "#2D2A44",
        row: "#27253B",
        txt: {
          100: "#D2D0E5",
          200: "#8E97A8",
        },
       "progress-green":"#6CC000",
       "nav-toggle-btn":"#484B63",
       "light-primary" : "#7232C2",
       "light-row" :'#F8F6FB',
       "light-active" : '#EDE2FA',
       "light-bg" :'#F2EFFB',
       "light-overiew-bg" :"#F5F7FA"
       
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
    require("daisyui")
    
  ],
};
