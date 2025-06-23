import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],  theme: {
    extend: {
      colors: {
        primary: '#ea580c', // Orange-500 from Tailwind
      },
      fontFamily: {
        oswald: ["var(--font-heading)"],
        roboto: ["var(--font-body)"],
        quentin: ["'Quentin'", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
