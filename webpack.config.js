const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    about: './src/about.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },

  plugins: [
    new CopyPlugin([
      {
        from: 'src/templates',
        to: 'templates',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
      options: {
        reloadAll: true,
      },
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      inject: true,
      chunks: ['index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: 'about.html',
      hash: true,
      inject: true,
      chunks: ['about'],
    }),
  ],

  module: {
    rules: [
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              outputPath: './fonts',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: 'images/[name].[ext]',
            esModule: false,
          },
        },
        ],
      },
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      },
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
    ],
  },
};
