import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        blue: {
          50:"#FBFCFF",
          100: "#364EA2",
          150:"#F9F9F9",
          200:"#364EA2"
        },
        black: {
          100:"#181819"
        },
        red:{
          100:"#CB6664"
        },
        gray:{
          50:"#666E79",
          100:"#70707069"
        },
        purple: {
          100:"#778FDF"
        }
      },
       fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'], 
        mark: ['MarkForMC', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
export default config;
