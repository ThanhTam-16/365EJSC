const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[hash][ext][query]',
  },

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[name].[hash][ext]',
        },
      },
    ],
  },

  plugins: [
    new CleanWebpackPlugin(),

    // ✅ COPY favicon từ public sang dist
    new CopyWebpackPlugin({
      patterns: [
        { from: 'public/logo.png', to: 'logo.png' },
      ],
    }),

    // ✅ Bật favicon để HtmlWebpackPlugin nhúng vào HTML
    new HtmlWebpackPlugin({
      template: './public/index.html',
      favicon: './public/logo.png',
    }),
  ],

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      '@': path.resolve(__dirname, '../src'),
      '@components': path.resolve(__dirname, '../src/components'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@styles': path.resolve(__dirname, '../src/styles'),
      '@assets': path.resolve(__dirname, '../src/assets'),
    },
  },
};
