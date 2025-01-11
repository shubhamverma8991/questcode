/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Include all React files
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF6600",
        secondary: "#FF9900",
        tertiary: "#FFC166",
        background: "#121212",
        card: "#1E1E1E",
        border: "#333333",
        accent: "#FF6600",
        buttontext: "#FFFFFF",
        textPrimary: "#f97316",
        textSecondary: "#B3B3B3",
        textTertiary: "#f8c471",
        success: "#4CAF50",
        error: "#FF4D4D",
        info: "#4DAFFF",
      },
      screens: {
        "max-sm": { max: "640px" }, // custom max-width breakpoint for 640px
      },
    },
  },
  plugins: [],
};
