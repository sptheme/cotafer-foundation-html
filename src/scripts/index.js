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
        $mobileMenuBreakpoint   : '992px',
      };
    },

    bindEvents : function() {
      var self = this;

      // Run on document ready
      self.config.$document.ready( function() {

        // Main navigation
        self.superFish();

        // Mobile menu
        self.menuToggle();

        // User modal switcher
        self.userModalSwitcher();

      });

      self.config.$window.resize( function() {
        // Window width change
        if ( self.config.$window.width() != self.config.$windowWidth ) {
          self.resizeUpdateConfig();
        }
      });

      // On orientation change
      self.config.$window.on( 'orientationchange',function() {
        resizeUpdateConfig();
      } );

    },

    /**
     * Updates config whenever the window is resized
     *
     */
    resizeUpdateConfig: function() {

      // Update main configs
      this.config.$windowHeight = this.config.$window.height();
      this.config.$windowWidth  = this.config.$window.width();
      this.config.$windowTop    = this.config.$window.scrollTop();

    },

    superFish: function() {

      if ( ! $.fn.superfish ) {
        return;
      }

      $( '#site-navigation ul.sf-menu' ).superfish( {
        delay: 600,
        animation: {
          opacity: 'show'
        },
        animationOut: {
          opacity: 'hide'
        },
        speed: 'fast',
        speedOut: 'fast',
        cssArrows: false,
        disableHI: false
      } );
    },

    menuToggle: function() {
      // Site navigation - Menu toggle
      $('.cf-nav-trigger').sidr({
        name: 'sidr-mobile-menu',
        source: '#mobile-menu-alternative',
        side: 'left',
        speed: 300,
        onOpen: function() {
          // Add dark overlay to content
          $('#pager').append( '<div class="sidr-overlay"></div>' );
          $( '.sidr-overlay' ).fadeIn( 300 );

          // Close sidr when clicking on overlay
          $( '.sidr-overlay' ).on( 'click', function( event ) {
            event.preventDefault();
            $.sidr( 'close', 'sidr-mobile-menu' );
          } );

          // Close on resize
          $(window).resize( function() {
            if ( this.config.$windowWidth >= this.config.$mobileMenuBreakpoint ) {
              $.sidr( 'close', 'sidr-mobile-menu' );
            }
          } );

          $('.cf-menu-icon').addClass('is-clicked');
        },
        onClose: function() {
          $('.cf-menu-icon').removeClass('is-clicked');

          // FadeOut overlay
          $( '.sidr-overlay' ).fadeOut( 300, function() {
            $( this ).remove();
          } );
        }
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
