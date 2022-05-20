const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      width: {
        100: "32rem",
      },
      colors: {
        // pink
        pink1: "#FEE4E9",
        pink2: "#F85D82",
        pink3: "#F33968",
        pink4: "#EF0F50",
        pink5: "#CA004A",
        pink6: "#930043",
        //gray
        gray1: "#FAFAFA",
        gray2: "#F5F5F5",
        gray3: "#E2E2E2",
        gray4: "#BDBDBD",
        gray5: "#9E9E9E",
        gray6: "#757575",
        gray7: "#212121",
        // dark blue
        blue1: "#E1F2F7",
        blue2: "#1F1744",
        blue3: "#261B5C",
      },
      spacing: {
        100: "30rem",
        68: "17rem",
        26: "6.5rem",
        30: "7.5rem",
        18: "4.5rem",
      },
      fontFamily: {
        popping: ["Poppins", "sans-serif"],
      },
      screens: {
        ...defaultTheme.screens,
        "3xl": "1696px",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require("@tailwindcss/line-clamp")],
};
