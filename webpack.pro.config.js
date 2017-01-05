var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var PRODUCTION = process.env.NODE_ENV === 'production'; // injecting your Node.js environment
var DEVELOPMENT = process.env.NODE_ENV === 'development';

module.exports = {
  entry: {
    theme: './src/scripts/index.js',
    vendor: [
      'tether',
      'font-awesome-loader',
      'bootstrap',
      'jquery-hoverintent',
      'superfish',
      'sidr/dist/jquery.sidr'
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public/'),
    filename: 'js/[name].min.js'
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/
      },
      {
        test: /\.s(a|c)ss$/,
        loader: ExtractTextPlugin.extract({
          fallbackLoader: 'style-loader',
          loader: 'css-loader?minimize!sass-loader',
          publicPath: 'css/'
        }),
        include: path.resolve(__dirname, "src/styles/")
      },
      {
        test: /\.woff2?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
          publicPath: 'fonts/',
          outputPath: path.resolve(__dirname, 'public/fonts') // Not working file-loader v0.9.0
        }
      },
      {
        test: /\.(ttf|eot|svg)(\?[\s\S]+)?$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
          publicPath: 'fonts/',
          outputPath: path.resolve(__dirname, 'public/fonts') // Not working file-loader v0.9.0
        }
      },
      {
        test: /\.(jpg|png)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]',
          publicPath: 'images/',
          outputPath: path.resolve(__dirname, 'public/images') // Not working file-loader v0.9.0
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new ExtractTextPlugin({ filename: 'css/style.min.css', allChunks: true }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
      'window.Tether': 'tether'
    }),
    new HtmlWebpackPlugin({  // Also generate a about.html
      title: 'Project page',
      filename: 'project.html',
      template: 'src/project.html'
    }),
    new webpack.DefinePlugin({
      PRODUCTION: JSON.stringify(PRODUCTION),
      DEVELOPMENT: JSON.stringify(DEVELOPMENT)
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor'] // Specify the common bundle's name.
    })
  ]
}
