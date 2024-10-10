import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/layout/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    screens: {
      xl: { max: "1600px" },
      lg: { max: "1440px" },
      md: { max: "1280px" },
      sm: { max: "1024px" },
      xs: { max: "768px" },
      "header-sm": { max: "959px" },
    },
    colors: {
      transparent: "transparent",
      white: "#ffffff",
      black: "#000000",
      "blue-one": "#2A36B8",
      "blue-two": "#1A205F",
      "blue-three": "#0B0F38",
      "orange-one": "#FF7F76",
      "orange-two": "#EF4136",
      "gray-one": "#F2F2F8",
      "gray-two": "#D1D2DF",
      "gray-three": "#8F97A1",
      "gray-four": "#414149",
      "google-blue": "#3E1CC5",
      "google-purple": "#991CC5",
      "google-green": "#1CC5A3",
      "google-pink": "#C51C8C",
    },
    fontSize: {
      "2xs": "14px",
      xs: "16px",
      sm: "18px",
      base: "20px",
      lg: "24px",
      xl: "32px",
      "2xl": "36px",
      "3xl": "48px",
      "4xl": "64px",
    },
    extend: {
      borderRadius: {
        sm: "10px",
        md: "20px",
        lg: "30px",
        xl: "40px",
        full: "50%",
      },
    },
  },
};
export default config;
