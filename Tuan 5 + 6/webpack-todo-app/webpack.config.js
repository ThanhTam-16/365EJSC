const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
  entry: './src/index.js',

  output: {
    filename: 'bundle.[contenthash].js', 
    path: path.resolve(__dirname, 'dist'),
    assetModuleFilename: 'assets/[name][ext]' 
  },

  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg)$/i,
        type: 'asset/resource'
      }
    ]
  },

  plugins: [
    new CleanWebpackPlugin(),
    
    new HtmlWebpackPlugin({
      template: './src/index.html',
      title: 'Webpack Todo App',
      favicon: './src/assets/icon.svg'
    })
  ],

  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 3000,
    hot: true 
  },

  devtool: 'inline-source-map'
};