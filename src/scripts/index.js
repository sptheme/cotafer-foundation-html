require('../styles/theme.scss');

$(function() {
  console.log('Webpack 2.0 Ready!');

  var cfTheme = {
    init: function(){
      this.config();
      this.bindEvents();
    },

    config: function() {
      this.config = {
        // Main
        $window                 : $( window ),
        $document               : $( document ),
        $windowWidth            : $( window ).width(),
        $windowHeight           : $( window ).height(),
        $windowTop              : $( window ).scrollTop(),
        $body                   : $( 'body' ),
        $viewportWidth          : '',
        $is_rtl                 : false,
      };
    },

    bindEvents : function() {
      var self = this;

      // Run on document ready
      self.config.$document.on( 'ready', function() {
        console.log('Document is ready!');
        // User modal switcher
        self.userModalSwitcher();
      });

      self.config.$window.resize( function() {
        console.log('Resize is started!');
      });

    },

    userModalSwitcher: function() {
      var switchSignup = $('#signup-alternative'),
      switchSignin = $('#signin-alternative');

      if ( switchSignup.length ) {
        switchSignup.click( function( event ) {
          event.preventDefault();
          $('#signin-modal').modal('toggle');
          console.log('signup modal is opened!');
        });
      }

      if ( switchSignin.length ) {
        switchSignin.click( function( event ) {
          event.preventDefault();
          $('#signup-modal').modal('toggle');
          console.log('signin modal is opened!');
        });
      }
    }
  }

  cfTheme.init();
});


// Hot module replacement for development env.
if (DEVELOPMENT) {
  var messages = require('./messages');

  var app = document.getElementById('node-env');
  app.innerHTML = '<small class="node-env">' + messages.mode + ': ' + DEVELOPMENT + '</small>';

	if (module.hot) {
		module.hot.accept();
	}
}
