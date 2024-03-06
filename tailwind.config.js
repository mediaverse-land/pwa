/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            h1: {
              fontSize: "2.5rem",
              fontWeight: "700",
              fontStyle: "normal",
              lineHeight: "normal",
              color: "white",
              margin: 0,
            },
            h2: {
              fontSize: "1.938rem",
              fontStyle: "normal",
              lineHeight: "normal",
              color: "white",
              margin: 0,
            },
            h3: {
              fontSize: "1.563rem",
              fontStyle: "normal",
              lineHeight: "normal",
              color: "white",
              margin: 0,
            },
            h4: {
              fontSize: "1.125rem",
              fontStyle: "normal",
              lineHeight: "normal",
              color: "white",
              margin: 0,
            },
            p: {
              fontSize: "0.875rem",
              fontStyle: "normal",
              lineHeight: "normal",
              color: "#C1C1CD",
              margin: 0,
            },
            a: {
              fontSize: "0.875rem",
              fontStyle: "normal",
              lineHeight: "normal",
              color: "#C1C1CD",
              margin: 0,
            },
            strong: {
              fontSize: "0.875rem",
              fontStyle: "normal",
              lineHeight: "bold",
              color: "#C1C1CD",
              margin: 0,
            },
          },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
};
