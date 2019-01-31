const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')


const isProd = process.env.NODE_ENV === 'production'

module.exports = {
  entry: './src/index.js',
  mode: isProd ? 'production' : 'development',
  devtool: isProd
    ? false
    : '#cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.(js)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  output: {
    path:  __dirname + '/dist',
    // publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    !isProd ? new webpack.HotModuleReplacementPlugin() : null,
    isProd ? new CopyWebpackPlugin([{ from: 'assets/images/*', to: './images'} ]) : null,
    new HtmlWebpackPlugin()
  ].filter(e => e),
  devServer: {
    contentBase: './assets',
    hot: true
  }
};
