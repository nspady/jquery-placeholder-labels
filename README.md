Consistent cross browser support for HTML5 Placeholders
=========================

A jQuery plugin to mimic Chrome, Firefox and Safari's handeling of the placeholder for unsupported browsers. It will keep the placeholder visible until text is entered into the input or textarea. The plugin functions by adding a parent label element for the input element.

Setup
-----
Required componenets for the plugin to function.

### JS
Include after jQuery is loaded

	$( function() {
		$("input[placeholder], textarea[placeholder]").placeholder_labels();
	});
	
### Options

	$( function() {
		$("input[placeholder], textarea[placeholder]").placeholder_labels({
			blurColor  : '#aaa', //The color of the placeholder text when not in focus. Default: '#aaa'
			focusColor : '#bbb', //The color of the placeholder text when in focus. Default: '#bbb'
			labelClass : 'placeholder-label' //Class added to the label which wraps the placeholder span and input
		});
	});

### Example label and text area
	<input type="text" name="name" placeholder="e.g. John Smith">

	<textarea name="comment" placeholder="Leave your comment here."></textarea>


Browser support
---------------
Tested successfully on:
IE 8+


