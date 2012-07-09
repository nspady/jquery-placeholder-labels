( function( $ ) {
  $.fn.placeholder_labels = function() {
    // encapsulate our variables into their own scope
    // test if HTML5 placeholder is supported; if so, quit
    if ('placeholder' in document.createelement('input')) {
      return ;
    }

    // Go through each input and/or text area and add a placeholder label
    // should be envoked as follows
    // $("input[placeholder], textarea[placeholder]").placeholder_labels();
    this.each(function(){
      var $input = $( this );
      var placeholder_text = $input.attr( 'placeholder' );
  
      // create a label and a span within it
      var $label = $( '<label class="placeholder"></label>' );
      var $span = $( '<span>' + placeholder_text + '</span>' );
      $span.appendTo( $label );
  
      // the label surrounds the input
      $label.insertBefore( $input ).append( $input );
  
      // try getting the input's size
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
      $input.bind('hide', function() {
        $span.hide();
      });
      // when showing, ensure the text is the right size
      $input.bind('show', function(){
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
        .bind("keydown keyup", function() {
          if ( $(this).val() === "" ) {
            $span.show();
          } else {
            $span.hide();
          }
        })
        .focus( function() {
          $span.addClass( "input-selected" );
        })
        .blur( function() {
          $span.removeClass( "input-selected" );
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
  };
})( jQuery );
