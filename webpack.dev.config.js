var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PRODUCTION = process.env.NODE_ENV === 'production'; // injecting your Node.js environment
var DEVELOPMENT = process.env.NODE_ENV === 'development';

module.exports = {
  devtool: 'source-map',
  entry: [
    'font-awesome-loader',
    'bootstrap',
    'jquery-hoverintent',
    'superfish',
    'sidr/dist/jquery.sidr',
    'webpack/hot/dev-server',
    'webpack-dev-server/client?http://localhost:8080',
    './src/scripts/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'public/'), // the target directory for all output files
    filename: 'js/theme.min.js'
  },

  module: {
    loaders: [{
      test: /\.scss$/,
      loaders: ['style-loader', 'css-loader?sourceMap', 'sass-loader?sourceMap'],
      include: path.resolve(__dirname, "src/styles")
    }, {
      test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
      //loader: 'url-loader?limit=10000',
      loader: 'url-loader',
      query: {
        emitFile: false
      }
    },
    {
      test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
      loader: 'file-loader',
      query: {
        emitFile: false
      }
    },
    {
      test: /\.(jpg|png|gif)$/,
      loader: 'file-loader'
    },]
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.jQuery': 'jquery',
      Tether: 'tether',
      'window.Tether': 'tether',
    }),
    new HtmlWebpackPlugin({  // Also generate a about.html
      title: 'Search page',
      filename: 'search.html',
      template: 'src/search.html'
    }),
    new HtmlWebpackPlugin({  // Also generate a about.html
      title: 'Project page',
      filename: 'project.html',
      template: 'src/project.html'
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION),
      DEVELOPMENT: JSON.stringify(DEVELOPMENT)
    })
  ]
}
