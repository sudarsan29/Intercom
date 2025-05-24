// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        "slide-up-fade": {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        "pulse-once": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.02)" },
        },
        "fade-flash": {
          "0%": { backgroundColor: "#f3e8ff" },
          "100%": { backgroundColor: "transparent" },
        },
      },
      animation: {
        "slide-up-fade": "slide-up-fade 0.4s ease-out forwards",
        "pulse-once": "pulse-once 0.4s ease",
        "fade-flash": "fade-flash 0.6s ease",
      },
    },
  },
  plugins: [],
};
