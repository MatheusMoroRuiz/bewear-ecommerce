// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      screens: {
        tablet: "768px",
        desktop: "1024px",
        "custom-lg": { min: "1200px", max: "1500px" }, // Example of a range
        portrait: { raw: "(orientation: portrait)" }, // Custom media query
      },
    },
  },
};
