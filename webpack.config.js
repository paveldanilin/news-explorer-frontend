const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    index: './src/index.js',
    about: './src/about.js',
    articles: './src/articles.js',
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name]/[name].bundle.js',
    chunkFilename: '[id].bundle_[chunkhash].js',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    globalObject: 'this',
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name]/[name].bundle.css',
      chunkFilename: '[id].css',
      ignoreOrder: false,
    }),
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      hash: true,
      inject: true,
      chunks: ['vendor', 'index'],
    }),
    new HtmlWebpackPlugin({
      template: './src/about.html',
      filename: 'about.html',
      hash: true,
      inject: true,
      chunks: ['vendor', 'about'],
    }),
    new HtmlWebpackPlugin({
      template: './src/articles.html',
      filename: 'articles.html',
      hash: true,
      inject: true,
      chunks: ['vendor', 'articles'],
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
              outputPath: 'fonts/',
              publicPath: '../fonts/',
            },
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|ico|svg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'images/',
            esModule: false,
            publicPath: '../images/',
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
            options: {
              hmr: process.env.NODE_ENV === 'development',
              reloadAll: true,
            }
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
