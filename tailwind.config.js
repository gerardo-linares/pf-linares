/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      colors: {
        bgPrimary: "bg-slate-100",
        buttonPrimary: "#DE00F9",
        buttonSecondary: "#DE00F9",
        textPrimary: "#DE00F9",
        borderPrimary: "#DE00F9",
      },
    },
  },
  plugins: [],
};
