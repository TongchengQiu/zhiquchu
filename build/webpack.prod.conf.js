var path = require('path')
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(baseWebpackConfig, {
  devtool: config.build.productionSourceMap ? '#source-map' : false,
  output: {
    path: config.build.assetsRoot,
    filename: path.join(config.build.assetsSubDirectory, '[name].[chunkhash:4].js'),
    chunkFilename: path.join(config.build.assetsSubDirectory, 'chunk[id].[chunkhash:4].js'),
    publicPath: config.build.assetsPublicPath
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:[\"> 1%\", \"IE 9\", \"Firefox >= 10\"]}!sass'),
      },
      {
        test: /\.css/,
        loader: ExtractTextPlugin.extract('style', 'css!autoprefixer?{browsers:[\"> 1%\", \"IE 9\", \"Firefox >= 10\"]}'),
      }
    ]
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/workflow/production.html
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    // extract css into its own file
    new ExtractTextPlugin(path.join(config.build.assetsSubDirectory, '[name].[contenthash:4].css'), {
      allChunks: true
    }),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: config.build.index,
      template: './index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
        // more options:
        // https://github.com/kangax/html-minifier#options-quick-reference
      }
    }),
  ]
})
