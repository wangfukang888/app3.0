module.exports = {
  plugins: [require('tailwindcss'), require('autoprefixer'), require('postcss-pxtorem')({
    rootValue: 37.5,
    propList: ['*'],
    exclude: /node_modules|folder_name/i
  })],
}