import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        "custom-bg": "#494368",
        "custom-1": "#CEEC97",
        "custom-2": "#F4B393",
        "custom-3": "#FC60A8",
        "custom-4": "#7A28CB",
        "custom-5": "#022b3a",
      },
    },
  },
  plugins: [],
};
export default config;
