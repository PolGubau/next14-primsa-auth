import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/flowbite/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f5f5ff",
          100: "#ebebff",
          200: "#c8c9ff",
          300: "#a5a7ff",
          400: "#6164ff",
          500: "#1d21ff",
          600: "#1a1de6",
          700: "#141499",
          800: "#0f0f7f",
          900: "#0b0b66",
        },
        secondary: {
          50: "#f5fff5",
          100: "#ebffeb",
          200: "#c9ffc9",
          300: "#a7ffa7",
          400: "#64ff64",
          500: "#21ff21",
          600: "#1de61d",
          700: "#149914",
          800: "#0f7f0f",
          900: "#0b660b",
        },
        tertiary: {
          50: "#fff5f5",
          100: "#ffebeb",
          200: "#ffc9c9",
          300: "#ffa7a7",
          400: "#ff6464",
          500: "#ff2121",
          600: "#e61d1d",
          700: "#991414",
          800: "#7f0f0f",
          900: "#660b0b",
        },
      },
    },
  },
  variants: {},

  plugins: [require("flowbite/plugin")],
};
export default config;
