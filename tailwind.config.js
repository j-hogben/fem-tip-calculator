/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      screens: {
        "landscape-app": "840px",
        "hover-fine": { raw: "(hover: hover) and (pointer: fine)" },
      },
      fontFamily: {
        SpaceMono: "Space Mono",
      },
      fontSize: {
        13: "0.8125rem",
        32: "2rem",
      },
      letterSpacing: {
        result: "-1px",
      },
      colors: {
        page: "#C5E4E7",
        input: "#F3F9FA",
        label: "#5E7A7D",
        "custom-label": "#547878",
        "green-dark": "#00474B",
        "green-vivid": "#26C2AE",
        "green-pale": "#9FE8DF",
        person: "#7F9D9F",
        "error-text": "#E17457",
        "error-container": "#E17052",
      },
      maxWidth: {
        calculator: "57.5rem",
      },
      padding: {
        "input-x": "1rem",
        "input-y": "0.5rem",
      },
      borderRadius: {
        card: "1.5625rem",
        results: "0.9375rem",
        input: "0.3125rem",
      },
    },
  },
  plugins: [],
};
