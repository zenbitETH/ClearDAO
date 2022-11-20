/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
				ele: ['Electrolize'],
			},
      colors: {
				display: ["group-hover"],
				  clear: {
				    900: "#8A58CA",
				    800: "#0077E4",
				    600: "#008AD9",
				    700: "#0093B2",
				    500: "#C52993",//Main
				    400: "#6473e0",
				    300: "#95a0ea",
				    200: "#b6bdf1",
				    100: "#00977F",
			  },
      }
      
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    // ...
  ],
}