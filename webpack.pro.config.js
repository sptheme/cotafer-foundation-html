var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var PRODUCTION = process.env.NODE_ENV === 'production'; // injecting your Node.js environment
var DEVELOPMENT = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    vendor: ['tether', 'bootstrap'],
    theme: './src/scripts/index.js'
  },
  output: {
    path: path.resolve(__dirname, "public/js/"), // the target directory for all output files
    publicPath: '/js/', // the url to the output directory resolved relative to the HTML page
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({ filename: '../css/style.min.css', allChunks: true }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.Tether': 'tether'
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION),
      DEVELOPMENT: JSON.stringify(DEVELOPMENT)
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loaders: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader', loader: 'css-loader?minimize'
      }),
      exclude: /node_modules/
    }, {
      test: /\.s(a|c)ss$/,
      loaders: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader', loader: 'css-loader?minimize!sass-loader',
      }),
      include: path.resolve(__dirname, "src/styles/")
    }]
  }
}
