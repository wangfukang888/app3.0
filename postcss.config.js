module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
    require('postcss-pxtorem')({
      rootValue: 37.5,
      propList: ['*'],
      selectorBlackList: ['.norem'],
      exclude: /node_modules|folder_name/i
    })
  ]
}
