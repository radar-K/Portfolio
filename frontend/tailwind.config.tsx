module.exports = {
  theme: {
    extend: {
      keyframes: {
        slowPulse: {
          "0%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.4)", opacity: "0.3" },
          "100%": { transform: "scale(1)", opacity: "0" },
        },
      },
      animation: {
        slowPulse: "slowPulse 8s ease-in-out",
      },
    },
  },
};
