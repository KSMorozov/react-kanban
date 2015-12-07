var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');
var path    = require('path');
var merge   = require('webpack-merge');

const TARGET = process.env.npm_lifecycle_event;

process.env.BABEL_ENV = TARGET;

const PATHS = {
  app : path.join(__dirname, 'app'),
  build : path.join(__dirname, 'build')
}

var common = {
  entry: PATHS.app,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [
      {
        test: /\.css$/,
        loaders: ['style', 'css'],
        include: PATHS.app
      },
      {
        test:/\.jsx?$/,
        loaders: ['babel'],
        include: PATHS.app
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({ title: 'Kanban app.' })
  ]
}

if (TARGET === 'start' || !TARGET) {
  module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
      historyApiFallback: true,
      hot: true,
      inline: true,
      progress: true,

      // display only errors
      stats: 'errors-only',

      // parse host and port from env vars
      host: process.env.HOST,
      port: process.env.PORT,
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin()
    ]
  })
}