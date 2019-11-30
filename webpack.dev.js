const merge = require('webpack-merge');
const dotenv = require('dotenv-webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  },
  plugins: [
    new dotenv({
      path: './.env.dev'
    }),
  ]
});
