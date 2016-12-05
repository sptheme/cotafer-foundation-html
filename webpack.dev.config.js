var path = require('path');
var webpack = require('webpack');

var PRODUCTION = process.env.NODE_ENV === 'production'; // injecting your Node.js environment
var DEVELOPMENT = process.env.NODE_ENV === 'development';

module.exports = {
  devtool: '#cheap-module-eval-source-map',
  entry: {
    vendor: ['tether','bootstrap'],
    theme: [
      './src/scripts/index.js',
      'webpack/hot/dev-server',
      'webpack-dev-server/client?http://localhost:8080'
    ]
  },
  output: {
    path: path.resolve(__dirname, "public/js/"), // the target directory for all output files
    publicPath: '/js/', // the url to the output directory resolved relative to the HTML page
    filename: '[name].min.js'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
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
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      include: path.resolve(__dirname, "src/styles")
    }]
  }
}
