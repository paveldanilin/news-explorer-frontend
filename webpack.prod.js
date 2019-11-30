const merge = require('webpack-merge');
const dotenv = require('dotenv-webpack');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'production',
  plugins: [
    new dotenv({
      path: './.env'
    }),
  ]
});
