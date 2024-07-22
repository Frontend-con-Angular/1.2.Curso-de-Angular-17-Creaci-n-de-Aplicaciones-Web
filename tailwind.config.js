/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'selector',
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      gridTemplateRows: {
        'layout': 'auto 0fr 1fr auto',
      },
      gridTemplateColumns: {
        'list-category': 'repeat(auto-fill, minmax(19rem, 1fr))'
      }
    },
  },
  plugins: [
    "prettier-plugin-tailwindcss",
    require('flowbite/plugin')
  ],
}

