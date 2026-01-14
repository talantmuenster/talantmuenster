import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],

  theme: {
    extend: {
      /* ===== COLORS ===== */
      colors: {
        primary: {
          DEFAULT: "#16235D",
          dark: "#0A102C",
          light: "#6673AD",
        },

        secondary: {
          DEFAULT: "#B5C2FA",
          dark: "#A1ADE1",
        },

        accent: {
          DEFAULT: "#D1751F",
          light: "#F9A352",
        },

        background: {
          blue: "#E3E9FF",
          orange: "#FFF5EC",
          "orange-dark": "#FFE1C2",
        },

        gray: {
          950: "#24252D",
          900: "#363944",
          800: "#1E293B",
          700: "#44485A",
          600: "#565C73",
          500: "#64748B",
          400: "#8A90A6",
          300: "#CBD5E1",
          200: "#D7D9E0",
          100: "#F1F5F9",
          50: "#F6F7F9",
        },
      },

      /* ===== TYPOGRAPHY ===== */
      fontFamily: {
        base: ["var(--font-roboto)", "sans-serif"],
        heading: ["var(--font-roboto-condensed)", "sans-serif"],
      },

      fontSize: {
        h1: ["56px", { lineHeight: "110%" }],
        lgg: ["16px", { lineHeight: "100%" }],
        sn: ["14px", { lineHeight: "100%" }],
        sm: ["12px", { lineHeight: "100%" }],
        md: ["14px", { lineHeight: "100%" }],
        lg: ["18px", { lineHeight: "100%" }],
        xl: ["20px", { lineHeight: "120%" }],
        "text-base": ["18px", { lineHeight: "100%" }],

        "heading-xl": ["48px", { lineHeight: "110%" }],
        "heading-lg": ["40px", { lineHeight: "110%" }],
        "heading-md": ["28px", { lineHeight: "110%" }],
        "heading-mdd": ["24px", { lineHeight: "110%" }],
        "2xl": ["28px", { lineHeight: "120%" }],
        "4xl": ["43px", { lineHeight: "102%" }],

        "5xl": ["58px", { lineHeight: "110%" }],
      },
      fontWeight: {
        medium: "500",
      },
      borderRadius: {
        sn: "4px",
        sm: "8px",
        m: "10px",
        md: "12px",
        lg: "16px",

        xl: "20px",
      },
    },
  },
  plugins: [],
};

export default config;
