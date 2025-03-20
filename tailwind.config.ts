import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-color-1": "#003D87",
        "primary-color-30": "#A6C8FF",
        "primary-color-60": "#0F62FE",
        "error-color": "#DA1E28",
        "warning-color": "#DA1E28",
        "success-color": "#DA1E28",
        "overlay-color": "#121619/50",
        "gray-10": "#F2F4F8",
        "gray-20": "#DDE1E6",
        "gray-30": "#C1C7CD",
        "gray-40": "#A2A9B0",
        "gray-50": "#878D96",
        "gray-60": "#697077",
        "gray-70": "#4D5358",
        "gray-80": "#343A3F",
        "gray-90": "#21272A",
        "gray-100": "#121619",
      },
    },
  },
  plugins: [],
};
export default config;
