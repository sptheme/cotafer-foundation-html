require('../styles/theme.scss');
var messages = require('./messages');

var app = document.getElementById('app');
app.innerHTML = '<p>' + messages.hi + ' ' + messages.event + '</p>';

$(function() {
  console.log('Webpack 2.0 Ready!');
});

// Hot module replacement for development env.
if (DEVELOPMENT) {
	if (module.hot) {
		module.hot.accept();
	}
}
