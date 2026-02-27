/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#1F3C88",
        "primary-hover": "#2E5AAC",
        "text-dark": "#2B2B2B",
        "text-placeholder": "#9E9E9E",
        "border": "#DADADA",
        "border-error": "#D64545",
      },
    },
  },
  plugins: [],
};
