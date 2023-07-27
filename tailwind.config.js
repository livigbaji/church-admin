/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#132034",
        // secondary: "#FFA400",
        // tertiary: "#C3B649",
        // animation: "#868686",
        text_light: "#525252",
        bg_active: "rgba(255, 255, 255, 0.15)",
      },
    },
  },
  plugins: [],
};
// rgba(255, 255, 255, 0.15)
