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
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "purpleBG": "linear-gradient(275deg, #5D46DD 1.24%, #7E69F6 97.24%)",
        "purpleCardBG": "linear-gradient(275deg, #6E58EB 1.24%, #9A88FE 97.24%)",
        "blackCardBG": "linear-gradient(275deg, #46474C 1.24%, #232429 97.24%)",
      },
    },
  },
  plugins: [],
};

export default config;
