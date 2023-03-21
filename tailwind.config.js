/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "poppins-900": 'Poppins-900',
        "poppins-900-italic": 'Poppins-900-Italic',
        "poppins-800": 'Poppins-800',
        "poppins-800-italic": 'Poppins-800-Italic',
        "poppins-700": 'Poppins-700',
        "poppins-700-italic": 'Poppins-700-Italic',
        "poppins-600": 'Poppins-600',
        "poppins-600-italic": 'Poppins-600-Italic',
        "poppins-500": 'Poppins-500',
        "poppins-500-italic": 'Poppins-500-Italic',
        "poppins-400": 'Poppins-400',
        "poppins-400-italic": 'Poppins-400-Italic',
        "poppins-300": 'Poppins-300',
        "poppins-300-italic": 'Poppins-300-Italic',
        "poppins-200": 'Poppins-200',
        "poppins-200-italic": 'Poppins-200-Italic',
        "poppins-100": 'Poppins-100',
        "poppins-100-italic": 'Poppins-100-Italic',
      },
      screens: {
        '-2xl': {'max': '1535px'},
        // => @media (max-width: 1535px) { ... }
  
        '-xl': {'max': '1279px'},
        // => @media (max-width: 1279px) { ... }
  
        '-lg': {'max': '1023px'},
        // => @media (max-width: 1023px) { ... }
  
        '-md': {'max': '767px'},
        // => @media (max-width: 767px) { ... }
  
        '-sm': {'max': '639px'},
        // => @media (max-width: 639px) { ... }
      },
      colors: {
        purple: "#3C1361",
        "purple-light": "#52307C",
        "purple-lighter": "#8B6EAE",
        "purple-lightest": "#E6E2EC",
        "gray-light": "#E0E0E0",
        "gray-lighter": "#D0D0D0",
        "gray-lightest": "#DBDBDB",
      },
      textColor: {
        black: '#393939',
        "black-light": '#424242',
        "black-lighter": '#373737',
        gray: '#CECECE',
        red: '#DB5C5C',
      },
      boxShadow: {
        sm: '0px 10px 10px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
