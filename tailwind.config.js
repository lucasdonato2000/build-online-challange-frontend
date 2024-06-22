/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        "red-hat": ['"Red Hat Display"', "sans-serif"],
        "public-sans": ['"Public Sans"', "sans-serif"],
      },
      fontSize: {
        base: "16px",
      },
      lineHeight: {
        10: "40px",
      },
      fontWeight: {
        medium: 500,
      },
      colors: {
        "custom-green": "#54FA80",
        "custom-grey": "#242424",
      },
    },
  },
  plugins: [],
};
