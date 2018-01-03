/* Author: Nathan Spady
 *
 * Add placeholder attribute support for older browsers such as IE 7-9
 * Also overrides IE 10-11 default behavior which hides the placeholder on focus
 *
 * https://github.com/nspady/jquery-placeholder-labels
 */

( function( $ ) {
  var IE10 = !!(navigator && navigator.userAgent && navigator.userAgent.match('MSIE 10'));
  var IE11 = !!(navigator && navigator.userAgent && navigator.userAgent.match(/Trident.*rv\:11\./));
  var overridePlaceholder = (IE10 || IE11);

  $.fn.placeholder_labels = function(options) {
    var that = this;
    var defaults = {
      blurColor  : '#aaaaaa',
      focusColor : '#bbbbbb',
      labelClass : 'placeholder-label'
    }

    var settings = $.extend({}, defaults, options);

    // test if HTML5 placeholder is supported or we do not want to
    // override default placeholder behavior; if so, quit
    if ('placeholder' in document.createElement('input') && !overridePlaceholder) {
      return this;
    }

    // Go through each input and/or text area and add a placeholder label
    // should be envoked as follows
    // $("input[placeholder], textarea[placeholder]").placeholder_labels();
    this.each(function(){
      var $input = $( this );
      var placeholder_text = $input.attr( 'placeholder' );

      if (overridePlaceholder) $input.attr('placeholder', '');

      var line_height = {};
      if( !$input.is('textarea') && $input.css('height') != 'auto') {
        line_height = { lineHeight: $input.css('height'), whiteSpace: 'nowrap' };
      }

      // create a label and a span within it
      var $label = $( '<label></label>' ).addClass(settings.labelClass);

      var $span = $( '<span>' + placeholder_text + '</span>' );
      $span.appendTo( $label );

      // Copy input styles and apply them to the placeholder
      // should get it 95% of the way toward looking right
      $span.css($.extend({
        position:'absolute',
        display: 'inline',
        float:' none',
        overflow: 'hidden',
        textAlign: 'left',
        color: settings.blurColor,
        cursor: 'text',
        paddingTop: $input.css('padding-top'),
        paddingRight: $input.css('padding-right'),
        paddingBottom: $input.css('padding-bottom'),
        paddingLeft: $input.css('padding-left'),
        marginTop: $input.css('margin-top'),
        marginRight: $input.css('margin-right'),
        marginBottom: $input.css('margin-bottom'),
        marginLeft: $input.css('margin-left'),
        fontSize: $input.css('font-size'),
        fontFamily: $input.css('font-family'),
        fontStyle: $input.css('font-style'),
        fontWeight: $input.css('font-weight'),
        textTransform: $input.css('text-transform'),
        backgroundColor: 'transparent',
        zIndex: 99
      }, line_height));

      // the label surrounds the input
      $label.insertBefore( $input ).append( $input );

      // try getting the input's size even if it is hidden
      var w = $input.width(),
          h = $input.height();

      // test for the case of the input being hidden
      if ( !w || !h ) {
        // get dimensions by cloning the input and grabbing height and width
        var $clone = $input.clone().appendTo( 'body' ).css({
          position : 'absolute',
          visibility : 'hidden',
          display : 'block'
        });

        // fetch the correct size (hopefully)
        w = $clone.width();
        h = $clone.height();

        $clone.remove();
      }

      // if the input is hidden or shown, so should the placeholder be
      $input.on('hide', function() {
        $span.hide();
      });
      // when showing, ensure the text is the right size
      $input.on('show', function(){
        $span.show().css({
          width:$input.width()+'px',
          height:$input.height()+'px'
        });
      });

      /* If the input is starting out hidden or there is a default value in
       * the input already, hide the placeholder
       */
      if ( !$input.is(':visible') || $input.val().length ) {
        $span.hide();
      }

      /* Show the placeholder untill a key is pressed in the field
       * restore the placeholder if the field is blank.
       */
      $input
        .on("keydown keyup", function() {
          if ( $(this).val() === "" ) {
            $span.show();
          } else {
            $span.hide();
          }
        })
        .focus( function() {
          $span
            .addClass( "input-selected" )
            .css('color', settings.focusColor);
        })
        .blur( function() {
          $span
            .removeClass( "input-selected" )
            .css('color', settings.blurColor);
        });

      // If the placeholder is focused, send focus to the input
      $span.focus( function() {
        $input.focus();
      });
    });

    // override jQuery.hide() to trigger the 'hide' event
    var hide = $.fn.hide;
    $.fn.hide = function() {
      this.trigger('hide');
      return hide.apply(this, arguments);
    };

    // override jQuery.show() to trigger the 'show' event
    var show = $.fn.show;
    $.fn.show = function() {
      this.trigger('show');
      return show.apply(this, arguments);
    };

    return that;
  };
})( jQuery );