module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'palette': {
          'one': '#E6CCFF',
          'two': '#8000FF',
          'three': '#00F399FA',
          'four': '#F45531'
        }
      }
    },
  },
  plugins: [],
}
