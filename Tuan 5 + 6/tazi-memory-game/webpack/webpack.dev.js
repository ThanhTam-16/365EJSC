const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 3000,
    compress: true,
    historyApiFallback: true,
  },

  optimization: {
    runtimeChunk: 'single',
  },
});