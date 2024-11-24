const plugin = require('tailwindcss/plugin'); 

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/preline/dist/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#1E293B', 
        secondary: '#C3FF00', 
      },
    },
  },
  plugins: [
    require('preline/plugin'),
    plugin(function ({ addUtilities }) {
      addUtilities({
        '.hs-overlay': {
          transition: 'transform 0.3s ease, opacity 0.3s ease',
        },
      });
    }),
  ],
};
