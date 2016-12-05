var WebpackDevServer = require('webpack-dev-server');
var webpack = require('webpack');
var config = require('./webpack.dev.config.js');
var path = require('path');

var compiler = webpack(config);
var server = new WebpackDevServer(compiler, {
	hot: true,
	filename: config.output.filename,
	contentBase: path.join(__dirname, "public"), //Tell the server where to serve content from
	publicPath: config.output.publicPath,
	stats:{
		colors: true
	}
});
server.listen(8080, 'localhost', function() {
	console.log("=> Listening on port 8080!");
});
