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
        "custom-1": "#494368",
        "custom-2": "#CEEC97",
        "custom-3": "#F4B393",
        "custom-4": "#FC60A8",
        "custom-5": "#7A28CB",
        "custom-6": "#022b3a",
        "custom-7": "#ff0000",
        "custom-8": "#1f7a8c",
      },
    },
  },
  plugins: [],
};
export default config;
