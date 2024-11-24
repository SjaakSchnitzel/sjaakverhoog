const plugin = require('tailwindcss/plugin'); 

module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/preline/dist/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#999999', 
        secondary: '#C3FF00',
        third: '#404040', 
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
