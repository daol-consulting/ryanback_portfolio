/** @type {import('tailwindcss').Config} */
export const content = ["./src/**/*.{js,jsx}"];
export const mode = "jit";
export const theme = {
  extend: {
    fontFamily: {
      sans: [
        "Pretendard",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Apple SD Gothic Neo",
        "Noto Sans KR",
        "sans-serif",
      ],
      display: ["Fraunces", "Georgia", "serif"],
    },
    colors: {
      primary: "#ffffff",
      secondary: "#4f6b80",
      tertiary: "#f0f6ff",
      "black-100": "#eef3ff",
      "black-200": "#e3ecff",
      "white-100": "#1e293b",
      accent: "#0f4c75",
      "brand-dark": "#1b262c",
      "brand-deep": "#0f4c75",
      "brand-primary": "#3282b8",
      "brand-light": "#bbe1fa",
      "brand-surface": "#f4fbff",
      "brand-surface-alt": "#eef7fc",
      "brand-chip": "#f7fcff",
    },
    boxShadow: {
      card: "0px 8px 32px rgba(15, 76, 117, 0.12)",
      "card-hover": "0px 16px 48px rgba(15, 76, 117, 0.22)",
      nav: "0 4px 24px rgba(15, 76, 117, 0.12)",
    },
    screens: {
      xs: "450px",
    },
    backgroundImage: {
      "hero-pattern":
        "radial-gradient(ellipse at 10% 60%, rgba(15,76,117,0.08) 0%, transparent 55%), radial-gradient(ellipse at 90% 10%, rgba(50,130,184,0.12) 0%, transparent 50%), linear-gradient(160deg, #ffffff 0%, #f4fbff 100%)",
    },
    animation: {
      "spin-slow": "spin 10s linear infinite",
    },
  },
};
export const plugins = [];
