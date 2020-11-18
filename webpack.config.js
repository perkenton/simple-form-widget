const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackMd5Hash = require('webpack-md5-hash');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpack = require('webpack');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';

module.exports = {
  entry: { 
    index: './src/scripts/index.js',
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'scripts/[name].[chunkhash].js'
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' }
      },
      {
        test: /\.css$/i,
        use: [
          isDev ? 'style-loader' : {
            loader: MiniCssExtractPlugin.loader,
            options: {
            publicPath: '../',
            },
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          'postcss-loader',
        ]
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        use: {
          loader: 'file-loader',
          options: { name: './fonts/[name].[ext]' }
        }
      },
      {
        test: /\.(png|jpe?g|gif|webp|ico|svg)$/i,
        use: [
          'file-loader?name=./images/[name].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
                quality: 65
              },
              pngquant: {
                quality: [0.90, 0.90],
                speed: 4
              },
              gifsicle: {
                interlaced: false,
              },
              optipng: {
                enabled: false,
              },
            }
          },
        ]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash].css',
    }),
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default'],
      },
      canPrint: true
    }),
    new HtmlWebpackPlugin({
      inject: false,
      template: './src/index.html',
      chunks: ['index'],
      filename: 'index.html'
    }),
    new WebpackMd5Hash(),
    new webpack.DefinePlugin({
    'NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    }),
  ]
};